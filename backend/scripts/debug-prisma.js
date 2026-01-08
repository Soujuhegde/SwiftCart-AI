const { PrismaClient } = require('../src/generated/client/client');

console.log('Attempting to instantiate PrismaClient...');
try {
    const prisma = new PrismaClient({}); // Try passing empty object as I did in the fix
    console.log('Instantiation successful');
} catch (error) {
    console.error('Instantiation failed:', error);
}

try {
    const prisma = new PrismaClient(); // Try no args
    console.log('Instantiation (no args) successful');
} catch (error) {
    console.error('Instantiation (no args) failed:', error);
}
