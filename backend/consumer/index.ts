import * as amqp from 'amqplib';
import { Profile } from '@prisma/client';
import { db } from './db';

const INACTIVITY_THRESHOLD = 30 * 60 * 1000; // 30 minutes in milliseconds
const QUEUE_NAME = 'profile-inactivity-check';

class ConsumerService {
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

            // Set prefetch to 1 to ensure fair distribution
            await channel.prefetch(1);

            // Start consuming
            await channel.consume(QUEUE_NAME, async (msg: amqp.ConsumeMessage | null) => {
                if (!msg) return;
                console.log('Received message:', msg.content.toString());
                
                try {
                    const profile = JSON.parse(msg.content.toString()) as Profile;
                    const now = new Date();
                    const lastActivity = profile.lastActivityAt ? new Date(profile.lastActivityAt) : null;

                    if (!lastActivity) {
                        channel.ack(msg);
                        return;
                    }

                    const timeSinceLastActivity = now.getTime() - lastActivity.getTime();

                    if (timeSinceLastActivity > INACTIVITY_THRESHOLD) {
                        await db.profile.update({
                            where: { id: profile.id },
                            data: { isActive: false }
                        });
                    }

                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                    // Reject message and requeue
                    channel.nack(msg, false, true);
                }
            });

            console.log('Consumer started - processing profile inactivity checks');
        } catch (error) {
            console.error('Error starting consumer:', error);
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
            console.error('Error closing consumer:', error);
            throw error;
        }
    }
}

const consumer = new ConsumerService();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    await consumer.close();
    process.exit(0);
});

// Start the consumer
consumer.run().catch(console.error); 