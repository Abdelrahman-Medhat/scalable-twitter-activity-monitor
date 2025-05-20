import { Worker } from 'bullmq';
import { Profile } from '@prisma/client';
import { db } from '@/db';

const INACTIVITY_THRESHOLD = 30 * 60 * 1000; // 30 minutes in milliseconds

const config = {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
};

const worker = new Worker('profile-inactivity-check', async (job) => {
    // Only process 'check-profile-inactivity' jobs
    if (job.name !== 'check-profile-inactivity') {
        return;
    }

    const profile = job.data as Profile;
    const now = new Date();
    const lastActivity = profile.lastActivityAt;

    if (!lastActivity) {
        return;
    }

    const timeSinceLastActivity = now.getTime() - lastActivity.getTime();

    if (timeSinceLastActivity > INACTIVITY_THRESHOLD) {
        await db.profile.update({
            where: { id: profile.id },
            data: { isActive: false }
        });
    }
}, config);

console.log('Inactivity check consumer started - processing check-profile jobs');

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    await worker.close();
    process.exit(0);
}); 