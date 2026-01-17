import { PrismaClient } from '../generated/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

console.log("Initializing Prisma Client...");
// Use global instance in dev to prevent connection exhaustion
export const prisma = globalForPrisma.prisma || (() => {
    try {
        console.log("Creating new PrismaClient instance...");
        const client = new PrismaClient({
            log: ['error', 'warn', 'query'],
        });
        console.log("PrismaClient instance created successfully.");
        return client;
    } catch (e) {
        console.error("Failed to create PrismaClient instance:", e);
        throw e;
    }
})();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
console.log("Prisma Client Initialization logic reached");
