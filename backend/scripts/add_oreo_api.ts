
import axios from 'axios';

async function main() {
    const port = 3002;
    const url = `http://localhost:${port}/api/manual-add`;

    // Cadbury Oreo Original Vanilla Creme Biscuits, 120g
    const productData = {
        barcode: '7622202324819',
        name: 'Cadbury Oreo Original Vanilla Creme Biscuits',
        description: 'Cadbury Oreo Original Vanilla Creme Biscuits, 120g',
        price: 35, // Estimated price
        imageUrl: 'https://m.media-amazon.com/images/I/61xJ0tPG26L.jpg',
        stock: 50,
        category: 'Biscuits'
    };

    console.log(`Adding product to ${url}...`);

    try {
        const response = await axios.post(url, productData);
        if (response.data.success) {
            console.log('Success!', response.data);
        } else {
            console.error('Failed:', response.data);
        }
    } catch (error: any) {
        console.error('Error adding product:', error.response?.data || error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('Trying port 3000...');
            try {
                const url3000 = `http://localhost:3000/api/manual-add`;
                const response = await axios.post(url3000, productData);
                console.log('Success on port 3000!', response.data);
            } catch (e: any) {
                console.error('Error on port 3000:', e.message);
            }
        }
    }
}

main();
