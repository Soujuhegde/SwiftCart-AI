import 'dotenv/config';
import axios from 'axios';

async function run() {
    const url = 'http://localhost:3000/api/scan';
    const userId = 'verify-match-user';

    const testCases = [
        { barcode: '012345678905', expectedName: 'Coca Cola 500ml' },
        { barcode: '8901030695552', expectedName: 'Parle-G Biscuits' },
        { barcode: '8901063092345', expectedName: 'Maggi Noodles' }
    ];

    console.log('Verifying Barcode -> Product mapping...');

    for (const test of testCases) {
        try {
            console.log(`Scanning ${test.barcode}...`);
            const res = await axios.post(url, { barcode: test.barcode, userId });

            if (res.data.success) {
                const actualName = res.data.product.name;
                const match = actualName === test.expectedName;
                console.log(`Result: ${match ? 'MATCH' : 'MISMATCH'}`);
                console.log(`  Expected: ${test.expectedName}`);
                console.log(`  Actual:   ${actualName}`);
            } else {
                console.error(`Failed to scan ${test.barcode}:`, res.data);
            }
        } catch (e: any) {
            console.error(`Error scanning ${test.barcode}:`, e.message);
        }
        console.log('---');
    }
}

run();
