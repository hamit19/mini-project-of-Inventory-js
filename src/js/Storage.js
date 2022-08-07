export default class Storage {
  // gets all categories if categories exists in our localStorage if it dose not exist in localStorage it'll return a empty array
  static getAllCategories() {
    let categories = localStorage.getItem("categories")
      ? JSON.parse(localStorage.getItem("categories"))
      : [];

    let sortedCategories = categories.sort((a, b) => {
      return Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1;
    });

    return sortedCategories;
  }

  // saves or updates categories
  static saveCategory(category) {
    // checks the categories in localStorage
    let categories = this.getAllCategories();

    const isExists = categories.some((c) => c.id === category.id);

    if (isExists) {
      // check if the category exists in our localStorage if exists the function will update the category as user asked
      let updatedCategories = categories.map((c) =>
        c.id === category.id
          ? {
              ...c,
              title: category.title,
              description: category.description,
              id: c.id,
              createdAt: new Date().toISOString(),
            }
          : c
      );
      // updates the localStorage values
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    } else {
      let newCategory = {
        ...category,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
      };

      categories.push(newCategory);

      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }

  // gets all products if products exists in our localStorage if it dose not exist in localStorage it'll return a empty array
  static getAllProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const sortedProducts = products.sort((a, b) => {
      return Date.parse(a.createdAt) > Date.parse(b.cratedAd) ? -1 : 1;
    });

    return sortedProducts;
  }
  // saves or updates products
  static saveProduct(product) {
    const products = this.getAllProducts();

    let isExists = products.some((p) => p.id === product.id);

    if (isExists) {
      let updatedProducts = products.map((p) =>
        p.id === product.id
          ? {
              ...p,
              title: product.title,
              createdAt: new Date().toISOString(),
              quantity: product.quantity,
              category: product.category,
            }
          : p
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      let newProduct = {
        ...product,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
      };

      products.push(newProduct);

      localStorage.setItem("products", JSON.stringify(products));
    }
  }
}
