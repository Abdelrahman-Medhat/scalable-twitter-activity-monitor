# RabbitMQ Message Broker Service

A dedicated message broker service that handles asynchronous communication between the Twitter activity monitoring services.

## Overview

This service provides a reliable message queue system using RabbitMQ, enabling asynchronous communication between the producer and consumer services. It ensures reliable message delivery, load balancing, and fault tolerance for the Twitter activity monitoring system.

## Architecture

- **Message Broker**: RabbitMQ
- **Protocol**: AMQP (Advanced Message Queuing Protocol)
- **Management Interface**: RabbitMQ Management Plugin
- **Persistence**: Disk-based message storage
- **High Availability**: Cluster support

## Key Features

- Reliable message delivery
- Message persistence
- Load balancing
- Message routing
- Dead letter queues
- Message acknowledgments
- Queue monitoring
- High availability support

## Queue Structure

### Main Queues
- `twitter.activity` - Main queue for Twitter activity events
- `twitter.inactivity` - Queue for inactivity alerts
- `twitter.status` - Queue for profile status updates

### Exchange Types
- Direct exchanges for precise routing
- Topic exchanges for pattern-based routing
- Fanout exchanges for broadcast messages

## Directory Structure

```
├── data/          # Persistent message storage
└── logs/          # RabbitMQ server logs
```

## Configuration

### Environment Variables
- `RABBITMQ_DEFAULT_USER` - Default admin username
- `RABBITMQ_DEFAULT_PASS` - Default admin password
- `RABBITMQ_NODE_PORT` - AMQP port (default: 5672)
- `RABBITMQ_MANAGEMENT_PORT` - Management UI port (default: 15672)

### Ports
- 5672: AMQP protocol port
- 15672: Management UI
- 25672: Cluster communication
- 61613: STOMP protocol
- 1883: MQTT protocol

## Service Integration

This service integrates with:
- Producer Service: Publishes messages to queues
- Consumer Service: Consumes messages from queues
- API Service: Monitors queue health and metrics

## Monitoring

The service provides monitoring capabilities through:
- RabbitMQ Management UI
- Prometheus metrics
- Health check endpoints
- Queue statistics
- Connection monitoring

## High Availability

The service supports high availability through:
- Cluster configuration
- Queue mirroring
- Automatic failover
- Load balancing
- Message persistence

## Security

- SSL/TLS encryption
- Authentication
- Access control
- Virtual hosts
- User permissions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC 