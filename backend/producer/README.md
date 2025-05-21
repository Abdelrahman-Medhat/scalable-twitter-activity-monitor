# Twitter Activity Producer Service

A dedicated microservice responsible for generating and publishing Twitter profile activity events to the message queue for processing.

## Overview

This service acts as the event producer in the system, responsible for monitoring Twitter profiles and publishing activity events to a message queue. It works in conjunction with the consumer service to enable real-time activity tracking and processing.

## Architecture

- **Framework**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Message Queue**: Redis with BullMQ
- **Containerization**: Docker
- **Type Safety**: TypeScript

## Key Features

- Real-time activity event generation
- Asynchronous event publishing
- Scalable queue-based architecture
- Automated event scheduling
- Containerized deployment
- Type-safe implementation

## Tech Stack

- Node.js 20+
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- Docker

## Project Structure

```
├── index.ts        # Main application entry
├── db.ts          # Database connection
├── prisma/        # Database schema and migrations
├── Dockerfile     # Container configuration
└── tsconfig.json  # TypeScript configuration
```

## Development Setup

1. **Prerequisites**
   - Node.js 20 or later
   - PostgreSQL
   - Redis
   - Docker (optional)

2. **Environment Variables**
   Required environment variables:
   - `DATABASE_URL`
   - `REDIS_HOST`
   - `REDIS_PORT`

3. **Available Scripts**
   - `npm run dev` - Development server
   - `npm run build` - Production build
   - `npm start` - Production server

## Docker Support

The service is containerized for easy deployment:
- `Dockerfile` for production builds
- Environment variable configuration
- Health check endpoints

## Service Integration

This service works in conjunction with the consumer service:
- Generates activity events
- Publishes events to the queue
- Maintains event scheduling
- Ensures data consistency

## Event Types

The service handles various types of Twitter activities:
- Tweets
- Retweets
- Replies
- Profile updates
- Activity status changes

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC 