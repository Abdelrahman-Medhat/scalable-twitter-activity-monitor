#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Run Prisma db push
echo "Running Prisma db push..."
npx prisma db push

# Start the application
echo "Starting the application..."
npm start 