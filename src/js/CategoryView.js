import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#title-of-cag");
const categoryDescription = document.querySelector("#des-of-cag");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const selectCategory = document.querySelector("#select-category");
const addNewCategoryShow = document.querySelector(".add-new-category-form");
const cancelCategory = document.querySelector("#cancel-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    addNewCategoryShow.addEventListener("click", () => {
      addNewCategoryShow.classList.toggle("active");
    });
    cancelCategory.addEventListener("click", (e) => {
      e.preventDefault();
      addNewCategoryShow.classList.remove("active");
    });
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;

    (!title, !description)
      ? alert("You should fill the title and description!")
      : Storage.saveCategory({ title, description });

    this.categories = Storage.getAllCategories();

    this.addNewCategoryToDOM();

    categoryTitle.value = "";
    categoryDescription.value = "";
    addNewCategoryShow.classList.remove("active");
  }

  setApp() {
    this.categories = Storage.getAllCategories();
    this.addNewCategoryToDOM();
  }

  addNewCategoryToDOM() {
    selectCategory.innerHTML = `<option value="">Select a category</option>`;

    this.categories.forEach((c) => {
      let option = document.createElement("option");

      option.setAttribute("value", `${c.id}`);
      option.innerText = c.title;

      selectCategory.appendChild(option);
    });
  }
}

export default new CategoryView();
