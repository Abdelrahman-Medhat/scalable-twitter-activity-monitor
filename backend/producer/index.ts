import * as amqp from 'amqplib';
import { db } from './db';

const QUEUE_NAME = 'profile-inactivity-check';
const CHECK_INTERVAL_MS = 60000; // 1 minute in milliseconds

// Sleep utility function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ProducerService {
    private connection: amqp.ChannelModel | null = null;
    private channel: amqp.Channel | null = null;

    constructor() {}

    async run() {
        try {
            // Connect to RabbitMQ
            const connection: amqp.ChannelModel = await amqp.connect({
                hostname: process.env.RABBITMQ_HOST || 'localhost',
                port: parseInt(process.env.RABBITMQ_PORT || '5672'),
                username: process.env.RABBITMQ_USER || 'guest',
                password: process.env.RABBITMQ_PASSWORD || 'guest'
            });
            this.connection = connection;

            // Create channel
            const channel: amqp.Channel = await connection.createChannel();
            this.channel = channel;

            // Ensure queue exists
            await channel.assertQueue(QUEUE_NAME, {
                durable: true
            });


            // Start scheduler with while loop
            const runScheduler = async () => {
                while (true) {
                    try {
                        const profiles = await db.profile.findMany({
                            where: { isActive: true }
                        });

                        for (const profile of profiles) {
                            await channel.sendToQueue(
                                QUEUE_NAME,
                                Buffer.from(JSON.stringify(profile)),
                                { persistent: true }
                            );
                        }

                        console.log(`Queued ${profiles.length} profiles for inactivity check`);
                    } catch (error) {
                        console.error('Error queuing profiles:', error);
                    }
                    
                    await sleep(CHECK_INTERVAL_MS);
                }
            };

            // Start the scheduler
            runScheduler();

            console.log('Producer started - queuing profiles every minute');
        } catch (error) {
            console.error('Error starting producer:', error);
            throw error;
        }
    }

    async close() {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
            }
        } catch (error) {
            console.error('Error closing producer:', error);
            throw error;
        }
    }
}

const producer = new ProducerService();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    await producer.close();
    process.exit(0);
});

// Start the producer
producer.run().catch(console.error); 