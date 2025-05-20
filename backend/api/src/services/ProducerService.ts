import { Queue, Worker } from 'bullmq';
import { db } from '@/db';

export class ProducerService {
    private queue: Queue;
    private worker: Worker;

    constructor() {
        this.queue = new Queue('profile-inactivity-check', {
            connection: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379')
            }
        });

        this.worker = new Worker('profile-inactivity-check', async (job) => {
            if (job.name === 'produce-profiles') {
                const profiles = await db.profile.findMany();

                // Queue each profile for inactivity check
                for (const profile of profiles) {
                    await this.queue.add('check-profile-inactivity', profile, {
                        attempts: 3,
                        backoff: {
                            type: 'exponential',
                            delay: 1000
                        }
                    });
                }
            }
        }, {
            connection: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379')
            }
        });
    }

    async startScheduler() {
        // Schedule job to run every minute
        await this.queue.add('produce-profiles', {}, {
            repeat: {
                every: 60000 // every minute
            }
        });

        console.log('Scheduler started - producing queue messages every minute');
    }

    async close() {
        await this.queue.close();
        await this.worker.close();
    }
} 