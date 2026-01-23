
import axios from 'axios';

async function main() {
    const port = 3002;
    const url = `http://localhost:${port}/api/update-product`;
    const barcode = '7622202324819';
    const imageUrl = 'https://m.media-amazon.com/images/I/61xJ0tPG26L.jpg';

    console.log(`Updating product ${barcode} at ${url}...`);

    try {
        const response = await axios.post(url, { barcode, imageUrl });
        console.log('Update Result:', response.data);
    } catch (error: any) {
        console.error('Update Failed:', error.response?.data || error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('Trying port 3000...');
            try {
                const url3000 = `http://localhost:3000/api/update-product`;
                const response = await axios.post(url3000, { barcode, imageUrl });
                console.log('Success on port 3000!', response.data);
            } catch (e: any) {
                console.error('Error on port 3000:', e.message);
            }
        }
    }
}

main();
