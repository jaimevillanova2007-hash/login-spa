
// funcion asincrona para obetener los productos que estan el json
export async function getPorducts() {
    const response = await fetch(`http://localhost:3000/products`);
    return response.json()
}

// funcion asincorna para crear nuevo producto

export async function createProduct(name,image,price,stock,description) {
    const response = await fetch(`http://localhost:3000/products`, {
        method: "POST",
        // etiqueta del objeto
        headers:{
        "Content-Type": "application/json"
        },
        // objeto nuevo
        body:JSON.stringify({
            name:name,
            description:description,
            stock:stock,
            price:price,
            url:image
        })
        });

}

// funcion asincrona que edita el producto 
export async function editProductApi(id, newStock, newPrice){
  const response = await fetch(`http://localhost:3000/products/${id}`, {
        method:"PATCH",
        // etiqueta del objeto
        headers:{
        "Content-Type": "application/json"
        },
        // objeto nuevo
        body:JSON.stringify({
            stock:newStock,
            price:newPrice,
        })
        });
}


export async function deleteProduct(id) {
     const response = await fetch(`http://localhost:3000/products/${id}`, {
        method:"DELETE",
    })
}