import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");
const productTitle = document.querySelector("#title-of-prod");
const productQuantity = document.querySelector("#quantity-of-prod");
const productCategory = document.querySelector("#select-category");
const productsList = document.querySelector("#products-list");

let categoryTitle = "";

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    productCategory.addEventListener("change", (e) => this.findCategory(e));
    this.products = [];
    this.categories = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = categoryTitle.title;

    !title && !quantity && !category
      ? alert("You should fill the fields first!")
      : Storage.saveProduct({ title, quantity, category });

    this.setApp();

    productTitle.value = "";
    productQuantity.value = "";
  }

  findCategory(e) {
    let categoryId = parseInt(e.target.value);

    categoryTitle = this.categories.find((c) => c.id === categoryId);
  }

  setApp() {
    this.products = Storage.getAllProducts();
    this.categories = Storage.getAllCategories();
    this.renderProductsToDOM();
  }

  renderProductsToDOM() {
    this.products.forEach((p) => {
      let productDiv = document.createElement("div");

      productDiv.className =
        "w-full px-2 py-3 rounded-md odd:bg-transparent even:bg-slate-600";

      productDiv.innerHTML = `
         <li class="flex items-center justify-between w-full">
            <!-- title of single product -->
           <h5 class="text-lg font-bold text-gray-50"> ${p.title} </h5>
           <!-- info and actions of product -->
           <div class="flex items-center gap-3">
             <!-- Date of Registration product -->
             <span class="text-gray-50">${Date.parse(p.createdAt)}</span>
            <!--   Category of product  -->
             <span
               class="p-2 px-4 border rounded-full border-slate-400 text-gray-50"
               >
               ${p.category}
             </span>
            <!-- Quantity of product -->
             <span
               class="w-4 h-4 p-4 text-sm font-bold border-2 rounded-full bg-slate-500 text-gray-50 border-slate-200 flex-centering"
               >
                ${p.quantity}
               </span
             >
            <!--  delete btn -->
             <button
               class="p-2 px-4 border rounded-full outline-none custom-transition hover:text-slate-900 hover:bg-slate-400 border-slate-400 text-gray-50"
             >
               Delete
             </button>
           </div>
         </li>
         `;

      productsList.appendChild(productDiv);
    });
  }
}

export default new ProductView();
