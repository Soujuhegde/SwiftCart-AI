
import axios from 'axios';

async function main() {
    const url = 'http://localhost:3002/api/scan';
    const barcode = '7622202324819';
    try {
        console.log(`Scanning ${barcode}...`);
        const response = await axios.post(url, { barcode });
        console.log('Product Found:', JSON.stringify(response.data.product, null, 2));
    } catch (error: any) {
        console.error('Error:', error.response?.data || error.message);
    }
}

main();
