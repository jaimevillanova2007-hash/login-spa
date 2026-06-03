// impotamos funciones 

import { getPorducts } from "../api";
import { router } from "/src/routes";
import { createProduct} from "../api";
import { editProductApi } from "../api";
import { deleteProduct } from "../api";



// renderiza el dashboard del seller
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
  <div id="editModal" class="fixed inset-0 bg-black/50 flex justify-center items-center hidden">
  <div class="bg-white p-6 rounded-xl w-96 shadow-lg">
    <h2 class="text-xl font-bold mb-4">Edit Product</h2>

    <input
      id="new-stock"
      type="number"
      placeholder="Enter new stock"
      class="w-full border p-2 rounded mb-3"
    />

    <input
      id="new-price"
      type="number"
      placeholder="Enter new price"
      class="w-full border p-2 rounded mb-4"
    />

    <div class="flex gap-2">
      <button id="save" class="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
        Save
      </button>

      <button id="btn-cancel" class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
        Cancel
      </button>
    </div>
  </div>
</div>




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

// funcion para añadir un porducto
export function addCard (){
    const btnAdd = document.getElementById("btn-add");
    const cancel = document.getElementById("cancel");
    const modalAdd = document.getElementById("modalAdd")
    const btnSave = document.getElementById("save");
    const formProduct = document.getElementById("formProduct")
    // evitamos el comportamiento de los formulario
    formProduct.addEventListener("submit", async (e) => { 
        e.preventDefault() //submit:evento enviar, e:captura el evento, e.p.d:evita el comportamiento
        const {name, image, price, stock, description} = Object.fromEntries(new FormData(formProduct))
        // destructuring:extraer datos de un objeto y guardarlo en variables, formData:nos permite crear un nuevo objeto ESPECIAL con formulario, clave:nameInput,
        // valor:dato ingresado por usuario, object.formE: comvierte en un objeto normal js 

        // se crea nuevo producto 
         await createProduct(name,image,price,stock,description)
    })
 
    //oculta y muestra ventana modal 
    btnAdd.addEventListener("click", () => {
        modalAdd.classList.toggle("hidden") //si no existe se crea, si exite se elimina 
    })
    cancel.addEventListener("click", () => {
      modalAdd.classList.toggle("hidden")
    })
  }
  
  export async function editProduct() {
    const btnsEdit = document.querySelectorAll(".btn-edit");
    const btnsDelete = document.querySelectorAll(".btn-remove")
    const editModal = document.getElementById("editModal");
    const cancelModal = document.getElementById("btn-cancel");
    const save = document.getElementById("save");
    const priceInput = document.getElementById("new-price")
    const priceStock = document.getElementById("new-stock")


    let currentId = null;
    
    save.addEventListener("click", ()=>{
      const newPrice = priceInput.value
      const newStock = priceStock.value
      
      
      editProductApi(currentId,newStock,newPrice)
      

    })
    cancelModal.addEventListener("click",()=>{
       editModal.classList.toggle("hidden")
    })

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click",()=>{
        const id = btn.dataset.id
        deleteProduct(id)

      })
    })


    btnsEdit.forEach((btn)=>{
      btn.addEventListener("click", () =>{
        const id = btn.dataset.id;
        currentId = id
        editModal.classList.toggle("hidden")

        
      })
    })
  }


// logout de seller
export async function sellerLogout() {
  const btnLogout = document.getElementById("btnLogout")
  btnLogout.addEventListener("click", () => {
    localStorage.clear()
     history.pushState({}, "", "/")
    router()
    
  })
}

//  renderiza las cartas de los productos 
export async function renderSeller() {
  const productsContainer = document.getElementById("products-container");
  const products = await getPorducts();
  products.forEach((product) => {
    productsContainer.innerHTML += `
    
    
    <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
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
    ${product.description}
    </p>
    
    <div class=" flex gap-3">
    <button data-id="${product.id}" class="btn-edit flex-1 bg-yellow-200  py-2 rounded-lg hover:bg-yellow-300 transition">
    edit
    </button>
    
    <button data-id="${product.id}"  class=" btn-remove flex-1  bg-red-500 py-2 rounded-lg hover:bg-red-600 transition">
    remove
    </button>
    </div>
    </div>
    </div>`
  });

  editProduct()
}



