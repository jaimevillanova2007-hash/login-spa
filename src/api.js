
export async function getPorducts() {
    const response = await fetch(`http://localhost:3000/products`);
    return response.json()
}

export async function createProduct(name,image,price,stock,description) {
    const response = await fetch(`http://localhost:3000/products`, {
        method: "POST",
        headers:{
        "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name:name,
            description:description,
            stock:stock,
            price:price,
            url:image
        })
        });

}