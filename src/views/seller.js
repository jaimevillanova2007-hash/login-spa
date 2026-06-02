import { getPorducts } from "../api";
import { router } from "/src/routes";
import { createProduct } from "../api";

export function seller() {
    return `<div class="min-h-screen bg-orange-50">

  <header class="bg-orange-200 shadow-md">
    <div class="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-orange-900">
        Shopping
      </h1>

      <div class="flex items-center gap-4">
         <button id="btn-add" class="flex-1 capitalize text-amber-50  bg-lime-500 p-2 rounded-lg hover:bg-lime-600 transition">
                add card
         </button>

        <button
            id = "btnLogout"
          class="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </header>


  <main class="max-w-7xl mx-auto px-8 py-10">
  <div id="modalAdd" class="fixed inset-0 flex items-center justify-center bg-black/50 hidden">
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-xl font-bold mb-4">Agregar producto</h2>

    <form id="formProduct" class="flex flex-col gap-3">
      <input
        name="name"
        class="border p-2 rounded"
        type="text"
        placeholder="name of the product"
        required
      />

      <input
        name="image"
        class="border p-2 rounded"
        type="text"
        placeholder="url image"
        required
      />

      <input
      name="price"
        class="border p-2 rounded"
        type="number"
        placeholder="price"
        required
      />
      <input
      name="stock"
        class="border p-2 rounded"
        type="number"
        placeholder="stock"
        required
      />
      <input
      name="description"
        class="border p-2 rounded"
        type="text"
        placeholder="description"
        required
      />

      <div class="flex justify-end gap-2 mt-4">
        <button
        id="cancel"
          type="button"
          class="px-4 py-2 bg-gray-300 rounded"
        >
          Cancelar
        </button>

        <button
          id="save"
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</div>
    <div id="products-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     

    </div>
  </main>
</div>`

}

export function addCard (){
    const btnAdd = document.getElementById("btn-add");
    const cancel = document.getElementById("cancel");
    const modalAdd = document.getElementById("modalAdd")
    const btnSave = document.getElementById("save");
    const formProduct = document.getElementById("formProduct")
    formProduct.addEventListener("submit", (e) => {
        e.preventDefault()
        const {name, image, price, stock, description} = Object.fromEntries(new FormData(formProduct))
         createProduct(name,image,price,stock,description)
    })

    btnAdd.addEventListener("click", () => {
        modalAdd.classList.toggle("hidden")
    })
    cancel.addEventListener("click", () => {
        modalAdd.classList.toggle("hidden")
    })
}

export async function sellerLogout() {
    const btnLogout = document.getElementById("btnLogout")
    btnLogout.addEventListener("click", () => {
        localStorage.clear()
        history.pushState({}, "", "http://localhost:5173/")
        router()

    })
}


export async function renderSeller() {
    const productsContainer = document.getElementById("products-container");
    const products = await getPorducts();
    products.forEach((product) => {
        productsContainer.innerHTML += ` <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
          <img
            src=${product.url}
            alt="Headphones"
            class="w-full h-56 object-cover"
          />
  
          <div class="p-5">
            <div class="flex justify-between items-center mb-3">
              <h2 class="text-xl font-semibold text-gray-800">
                ${product.name}
              </h2>
  
              <span class="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Stock: ${product.stock}
              </span>
            </div>
  
            <p class="text-orange-500 text-2xl font-bold mb-3">
              $${product.price}
            </p>
  
            <p class="text-gray-600 mb-5">
              ${product.desc}
            </p>
  
            <div class="flex gap-3">
              <button class="flex-1 bg-yellow-200  py-2 rounded-lg hover:bg-yellow-300 transition">
                edit
              </button>
  
              <button class="flex-1  bg-red-500 py-2 rounded-lg hover:bg-red-600 transition">
                remove
              </button>
            </div>
          </div>
        </div>`
    });
}



