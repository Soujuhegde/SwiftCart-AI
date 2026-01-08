async function checkApi() {
    try {
        const response = await fetch('http://localhost:3002/api/products');
        console.log("Status:", response.status);
        const data = await response.json();

        if (data && data.products && data.products.length > 0) {
            console.log("First Product Keys:", Object.keys(data.products[0]));
            if (data.products[0].stock !== undefined) {
                console.log("First Product Stock:", data.products[0].stock);
            } else {
                console.log("Stock field is MISSING in the first product");
            }

            const hasStock = data.products.some(p => p.stock > 0);
            console.log("Any product has stock > 0:", hasStock);

            // Log the raw first product to be sure
            console.log("First product raw:", JSON.stringify(data.products[0]));
        } else {
            console.log("No products found or invalid format");
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error fetching API:", error.message);
        if (error.cause) console.error("Cause:", error.cause);
    }
}

checkApi();
