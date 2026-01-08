const axios = require('axios');

async function testManualAdd() {
    const url = 'http://localhost:3000/api/manual-add';

    // 1. Success Case
    console.log('Testing Success Case...');
    try {
        const res = await axios.post(url, {
            name: 'Test Manual Product',
            price: 50.00,
            description: 'A manually added product for testing',
            category: 'Test'
        });
        console.log('Success:', res.data.success);
        console.log('Product ID:', res.data.product.id);
        console.log('Barcode:', res.data.product.barcode);
    } catch (err) {
        console.error('Success Case Failed:', err.code ? err.code : (err.response ? err.response.data : err.message));
    }

    // 2. Error Case (Missing Name)
    console.log('\nTesting Missing Name Error...');
    try {
        await axios.post(url, {
            price: 100
        });
        console.error('Error Case Failed: Should have thrown error');
    } catch (err) {
        if (err.response && err.response.status === 400) {
            console.log('Caught Expected Error:', err.response.data.error);
        } else {
            console.error('Error Case Failed:', err.message);
        }
    }
}

testManualAdd();
