import { Profile, Activity } from '@prisma/client';
import { ActivityType } from '../types';
import { db } from '../db';

export class TwitterService {
    async storeActivity(handle: string, type: ActivityType, timestamp?: Date): Promise<Profile> {
        const activityTime = timestamp || new Date();

        // First get the existing profile
        const existingProfile = await db.profile.findUnique({
            where: { handle }
        });

        // Update or create profile
        const profile = await db.profile.upsert({
            where: { handle },
            update: {
                activityCount: { increment: 1 },
                // Only update lastActivityAt if new timestamp is more recent
                ...(existingProfile?.lastActivityAt && existingProfile.lastActivityAt > activityTime 
                    ? {} 
                    : { lastActivityAt: activityTime }),
                isActive: true
            },
            create: {
                handle,
                activityCount: 1,
                lastActivityAt: activityTime,
                isActive: true
            }
        });

        // Create activity record
        await db.activity.create({
            data: {
                type,
                timestamp: activityTime,
                profileId: profile.id
            }
        });

        return profile;
    }

    async getProfiles(): Promise<Profile[]> {
        return db.profile.findMany({
            orderBy: { lastActivityAt: 'desc' }
        });
    }

    async getInactiveProfiles(): Promise<Profile[]> {
        return db.profile.findMany({
            where: { isActive: false },
            orderBy: { lastActivityAt: 'desc' }
        });
    }
} 