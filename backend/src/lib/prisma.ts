import { PrismaClient } from '../generated/client';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

console.log("Initializing Prisma Client...");

export const prisma = globalForPrisma.prisma || (() => {
    try {
        console.log("Creating new PrismaClient instance with Adapter...");
        const connectionString = process.env.DATABASE_URL!;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);

        const client = new PrismaClient({
            adapter,
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
