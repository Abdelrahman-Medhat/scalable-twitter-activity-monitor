# 🐦 Twitter Activity Monitoring System

A scalable microservices-based system for monitoring Twitter profile activities and inactivity alerts using a producer-consumer architecture. Features a modern UI built with React.js, Vite, Shadcn, and Tailwind CSS for a responsive and beautiful user experience.

## 🖼️ React.js + Vite UI

![React.js with Vite UI](ui.png)

## 🔄 Scaling Configuration

The system is engineered for massive horizontal scaling, specifically designed to handle billions of Twitter profiles across distributed Docker containers and multiple servers. The consumer service is the backbone of this scalability, configured in `docker-compose.yml` to support:

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

### 💪 High Availability Features
- **Automatic Failover**: If a consumer fails, its work is redistributed
- **Zero Downtime**: Rolling updates and deployments
- **Fault Tolerance**: Built-in retry mechanisms and error handling
- **Data Consistency**: Ensures no profile is missed during scaling operations

### 📊 Performance Optimization
- **Resource Management**: Each consumer is optimized for CPU and memory usage
- **Queue Management**: Smart queue partitioning for efficient processing
- **Batch Processing**: Optimized for handling large batches of profiles
- **Memory Efficiency**: Efficient data structures for profile tracking

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

## 🔄 Scaling Configuration

The system is designed for horizontal scaling, particularly the consumer service. In the `docker-compose.yml`, the consumer service is configured with:

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

This configuration allows the consumer service to:
- Run multiple instances for load balancing
- Automatically restart on failures
- Distribute message processing across instances
- Handle increased message volume

## 🔍 Monitoring

- **API Metrics**: `http://localhost:3000/metrics`
- **RabbitMQ Metrics**: `http://localhost:15672/api/metrics`
- **Queue Status**: `http://localhost:15672/#/queues`

## 🛠️ Development

### Local Development
```bash
# Start services in development mode
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment
```bash
# Start services in production mode
docker-compose -f docker-compose.prod.yml up -d

# Scale consumer service
docker-compose -f docker-compose.prod.yml up -d --scale consumer=5
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