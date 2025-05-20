# Twitter Activity Backend

A Node.js backend service for tracking Twitter profile activities and inactivity alerts.

## Features

- Track profile activities (tweets, retweets, replies)
- Monitor profile inactivity
- RESTful API endpoints
- PostgreSQL database with Prisma ORM
- Redis-based queue processing with BullMQ

## Prerequisites

- Node.js 20 or later
- PostgreSQL
- Redis

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/twitter_activity"
   REDIS_HOST="localhost"
   REDIS_PORT="6379"
   PORT="3000"
   ```

3. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /activity
Log a new activity for a profile.

Request body:
```json
{
  "handle": "elonmusk",
  "type": "TWEET",
  "timestamp": "2024-02-20T12:00:00Z" // Optional
}
```

### GET /profiles
Get a list of all profiles with their activity status.

### GET /alerts
Get a list of profiles that have been inactive for more than 30 minutes.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests 