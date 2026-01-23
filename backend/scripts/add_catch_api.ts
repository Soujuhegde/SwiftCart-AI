
import axios from 'axios';

async function main() {
    const port = 3002;
    const url = `http://localhost:${port}/api/manual-add`;

    const productData = {
        barcode: '8901192001207',
        name: 'Catch Black Salt Sprinklers',
        description: 'Catch Black Salt Sprinklers 200 g',
        price: 60,
        imageUrl: 'https://m.media-amazon.com/images/I/61NKu6+rWtL.jpg',
        stock: 100,
        category: 'Spices'
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
