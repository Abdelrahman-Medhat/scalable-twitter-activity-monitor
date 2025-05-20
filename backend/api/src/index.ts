import express from 'express';
import cors from 'cors';
import { TwitterService } from '@/services/TwitterService';
import { activityPayloadSchema } from '@/schemas/activity';
import { ActivityPayload } from '@/types';
import { ProducerService } from '@/services/ProducerService';
import { ZodError } from 'zod';

const app = express();
const port = process.env.PORT || 3000;
const twitterService = new TwitterService();
const producerService = new ProducerService();


/**
    Start Scheduler where it's act as a producer only to produce queue messages for all the 
    profiles every minute this is the best practice for a scalable system because we are not
    running any background jobs, we are just producing queue messages and a worker will be
    consuming those messages in the background to check the inactivity of the profiles it can
    be one worker or multiple workers, it depends on the count of docker containers running.
 */
producerService.startScheduler().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/activity', async (req, res) => {
    try {
        const payload = activityPayloadSchema.parse(req.body) as ActivityPayload;
        const timestamp = payload.timestamp ? new Date(payload.timestamp) : undefined;

        const profile = await twitterService.storeActivity(
            payload.handle,
            payload.type,
            timestamp
        );

        res.status(201).json(profile);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(422).json({ 
                message: 'Validation Error',
                errors: error.errors 
            });
        } else {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(400).json({ error: errorMessage });
        }
    }
});

app.get('/profiles', async (req, res) => {
    try {
        const profiles = await twitterService.getProfiles();
        res.json(profiles);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});

app.get('/alerts', async (req, res) => {
    try {
        const inactiveProfiles = await twitterService.getInactiveProfiles();
        res.json(inactiveProfiles);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    process.exit(0);
}); 