# Twitter Activity Consumer Service

A dedicated microservice for processing Twitter profile activity data and managing inactivity checks in real-time.

## Overview

This service acts as a background processor that consumes activity data from a message queue, processes profile inactivity checks, and updates profile statuses accordingly. It's designed to work in conjunction with the main API service to provide real-time activity monitoring.

## Architecture

- **Framework**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Message Queue**: Redis with BullMQ
- **Containerization**: Docker
- **Type Safety**: TypeScript

## Key Features

- Asynchronous activity processing
- Real-time inactivity monitoring
- Scalable queue-based architecture
- Automated status updates
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

This service works in conjunction with the main API service:
- Consumes activity data from the queue
- Processes inactivity checks
- Updates profile statuses
- Maintains data consistency

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC 