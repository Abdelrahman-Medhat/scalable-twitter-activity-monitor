# 🐦 Twitter Activity Monitoring System

A scalable microservices-based system for monitoring Twitter profile activities and inactivity alerts using a producer-consumer architecture. Features a modern UI built with React.js, Vite, Shadcn, and Tailwind CSS for a responsive and beautiful user experience.

## 🖼️ Modern UI Stack

Built with a powerful combination of modern frontend technologies:
- **React.js + Vite**: For lightning-fast development and optimal performance
- **Shadcn/ui**: Beautiful, accessible, and customizable components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

![React.js with Vite UI](ui.png)

## 🔄 Scaling Configuration

RabbitMQ is the core of this system that engineered for massive horizontal scaling, specifically designed to handle billions of Twitter profiles across distributed Docker containers and multiple servers. At its core, RabbitMQ serves as the message broker, enabling asynchronous processing of profile inactivity checks in a highly scalable manner. The consumer service is the backbone of this scalability, configured in `docker-compose.yml` to support:

```yaml
consumer:
  deploy:
    replicas: 3  # Number of consumer instances
    resources:
      limits:
        cpus: '0.5'
        memory: 512M
    restart_policy:
      condition: on-failure
```

### 🚀 Massive Scale Processing
- **Distributed Processing**: Each consumer instance can process thousands of profiles simultaneously
- **Load Distribution**: Work is automatically distributed across all consumer instances
- **Cross-Server Deployment**: Consumers can be deployed across multiple physical servers
- **Dynamic Scaling**: Automatically scales based on queue size and processing load

This architecture allows the system to:
- Process billions of Twitter profiles efficiently
- Scale horizontally across multiple servers
- Maintain high availability and reliability
- Handle sudden spikes in profile activity
- Ensure consistent monitoring across all profiles

## ✨ Key Features

- 🔄 Real-time activity monitoring
- 📊 Scalable microservices architecture
- 🔌 Asynchronous message processing
- 🚀 High availability with service replication
- 📈 Horizontal scaling support
- 🔒 Secure API endpoints
- 📝 Activity logging and tracking
- ⚡ Inactivity alerts

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Running the System

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd scalable-twitter-activity-monitor
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

## 🔌 Service Access

### API Service
- **URL**: `http://localhost:80`

### RabbitMQ Management
- **URL**: `http://localhost:15672`
- **Default Credentials**:
  - Username: `guest`
  - Password: `guest`

### PostgreSQL
- **Port**: `5432`
- **Default Credentials**:
  - Username: `postgres`
  - Password: `postgres`
  - Database: `twitter_activity`

## 📦 Service Ports

| Service    | Port  | Description                    |
|------------|-------|--------------------------------|
| API        | 80  | REST API endpoints               |
| RabbitMQ   | 5672  | AMQP protocol                 |
| RabbitMQ   | 15672 | Management interface          |
| PostgreSQL | 5432  | Database access               |

## 🔍 Monitoring
- **RabbitMQ Metrics**: `http://localhost:15672`
- **Queue Status**: `http://localhost:15672/#/queues`

## 🛠️ Development

### Local Development
```bash
# Start services in development mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 Documentation

- [API Documentation](backend/api/README.md)
- [Producer Service](backend/producer/README.md)
- [Consumer Service](backend/consumer/README.md)
- [RabbitMQ Service](backend/rabbitmq/README.md)

## 🔒 Security Notes

- Change default credentials in production
- Use environment variables for sensitive data
- Enable SSL/TLS for production deployments
- Configure proper firewall rules
- Implement rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC 

## 🧪 Testing

### Running Tests

Each service has its own test suite. Here's how to run tests for each component:

```bash
# API Service Tests
cd backend/api
npm test
npm run test:coverage  # For coverage report

# Producer Service Tests
cd backend/producer
npm test

# Consumer Service Tests
cd backend/consumer
npm test

# Frontend Tests
cd frontend
npm test
npm run test:coverage  # For coverage report
```

### Test Types
- **Unit Tests**: Testing individual components and functions
- **Integration Tests**: Testing service interactions
- **E2E Tests**: Testing complete user flows
- **Load Tests**: Testing system performance under load

### Test Coverage
- API Service: Jest + Supertest
- Producer/Consumer: Jest
- Frontend: Vitest + React Testing Library 