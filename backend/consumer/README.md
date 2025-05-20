# Twitter Activity Consumer

A separate service for processing Twitter profile inactivity checks.

## Features

- Processes profile inactivity checks from Redis queue
- Updates profile status based on activity timestamps
- Runs as a separate containerized service

## Prerequisites

- Node.js 20 or later
- PostgreSQL
- Redis

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/twitter_activity"
   REDIS_HOST="localhost"
   REDIS_PORT="6379"
   ```

3. Initialize the database:
   ```bash
   npx prisma generate
   ```

4. Start the service:
   ```bash
   npm run dev
   ```

## Docker

Build and run the container:
```bash
docker build -t twitter-activity-consumer .
docker run -d twitter-activity-consumer
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server 