FROM node:20-slim

WORKDIR /app

# Install OpenSSL and netcat
RUN apt-get update -y && apt-get install -y openssl netcat-traditional

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Re-run npm install to ensure module-alias is configured correctly
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Make entrypoint script executable
RUN chmod +x entrypoint.sh

# Expose port
EXPOSE 3000

# Use entrypoint script
ENTRYPOINT ["./entrypoint.sh"] 