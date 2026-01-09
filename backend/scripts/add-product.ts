import 'dotenv/config';
import axios from 'axios';

async function run() {
    const barcode = '8901491101844';
    const url = 'http://localhost:3000/api/scan';
    const userId = 'seed-script-user';

    console.log(`Adding product ${barcode}...`);

    try {
        const response = await axios.post(url, { barcode, userId });
        if (response.data.success) {
            console.log('Success!');
            console.log('Product Name:', response.data.product.name);
            console.log('Source:', response.data.product.source);
        } else {
            console.error('Failed:', response.data);
        }
    } catch (e: any) {
        if (e.response?.data?.needManualEntry) {
            console.log('Product not found in OpenFoodFacts. You may need to add it manually.');
        } else {
            console.error('Error:', e.response?.data || e.message);
        }
    }
}

run();
