import { router } from "/src/routes";
import { getPorducts } from "../api";


export function client (){
    return `<div class="min-h-screen bg-orange-50">

  <header class="bg-orange-200 shadow-md">
    <div class="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-orange-900">
        Shopping
      </h1>

      <div class="flex items-center gap-4">
        <button
          class="relative bg-white px-5 py-2 rounded-lg shadow hover:bg-orange-100 transition"
        >
          🛒 Cart
         
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
    <div id="products-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
     

    </div>
  </main>
</div>`
}

export async function clientLogout () {
    const btnLogout = document.getElementById("btnLogout")
    btnLogout.addEventListener("click", () => {
        localStorage.clear()
        history.pushState({}, "", "http://localhost:5173/")
        router()

    })
}

export async function renderCards () {

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
            <button class="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
              Buy Now
            </button>

            <button class="flex-1 border border-orange-500 text-orange-500 py-2 rounded-lg hover:bg-orange-50 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>`
    });
}