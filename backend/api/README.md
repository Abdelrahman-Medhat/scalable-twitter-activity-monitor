# Twitter Activity Backend API

A robust Node.js backend service designed to track and monitor Twitter profile activities, providing real-time insights and inactivity alerts.

## Overview

This service provides a RESTful API for tracking Twitter profile activities and monitoring profile inactivity. It's built with scalability and reliability in mind, using modern technologies and best practices.

## Architecture

- **Framework**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Queue System**: Redis with BullMQ
- **API Documentation**: OpenAPI/Swagger
- **Testing**: Jest
- **Type Safety**: TypeScript

## Key Features

- Real-time activity tracking
- Profile inactivity monitoring
- Scalable queue-based processing
- Type-safe API endpoints
- Comprehensive test coverage
- Docker support for easy deployment

## Tech Stack

- Node.js 20+
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- Jest
- Docker

## Project Structure

```
src/
├── controllers/    # Request handlers
├── services/      # Business logic
├── models/        # Data models
├── routes/        # API routes
├── utils/         # Helper functions
├── config/        # Configuration
└── types/         # TypeScript types
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
   - `PORT`

3. **Available Scripts**
   - `npm run dev` - Development server
   - `npm run build` - Production build
   - `npm start` - Production server
   - `npm test` - Run tests
   - `npm run test:watch` - Watch mode for tests
   - `npm run test:coverage` - Test coverage report

## Docker Support

The project includes Docker configuration for easy deployment and development:
- `Dockerfile` for production builds
- `docker-compose.yml` for local development
- `entrypoint.sh` for container initialization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

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