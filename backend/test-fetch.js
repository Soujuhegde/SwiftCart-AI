const axios = require('axios');

async function test() {
    try {
        console.log('Fetching...');
        const res = await axios.get('http://localhost:3002/api/dashboard/stats');
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (e) {
        console.error('Error:', e.message);
        if (e.response) {
            console.error('Response Status:', e.response.status);
            console.error('Response Data:', e.response.data);
        }
    }
}

test();
