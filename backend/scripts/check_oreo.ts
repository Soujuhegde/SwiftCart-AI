
import { PrismaClient } from '../src/generated/client';

const prisma = new PrismaClient();

async function main() {
    const barcode = '7622202324819';
    console.log(`Checking product ${barcode}...`);
    const product = await prisma.product.findUnique({
        where: { barcode },
    });
    console.log(product);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
