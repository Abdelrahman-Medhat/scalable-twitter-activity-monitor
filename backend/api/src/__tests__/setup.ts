import { PrismaClient } from '@prisma/client';

// Create a new Prisma Client instance for testing
const prisma = new PrismaClient();

// Clean up the database before each test
beforeEach(async () => {
  // Delete all records from the database
  await prisma.profile.deleteMany();
});

// Close the Prisma Client after all tests
afterAll(async () => {
  await prisma.$disconnect();
}); 