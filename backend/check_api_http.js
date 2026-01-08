const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('api_result.txt');
const log = (msg) => {
    file.write(msg + '\n');
    console.log(msg); // Just in case
};

http.get('http://localhost:3002/api/products', (res) => {
    log(`Status: ${res.statusCode}`);
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.products && json.products.length > 0) {
                const first = json.products[0];
                log('First Product Keys: ' + Object.keys(first).join(', '));
                log('First Product Stock: ' + first.stock);
                log('Full First Product: ' + JSON.stringify(first));
            } else {
                log('No products or invalid format');
                log('Raw Data: ' + data.substring(0, 500));
            }
        } catch (e) {
            log('Error parsing JSON: ' + e.message);
            log('Raw Data: ' + data.substring(0, 500));
        }
        file.end();
    });

}).on('error', (err) => {
    log('Error: ' + err.message);
    file.end();
});
