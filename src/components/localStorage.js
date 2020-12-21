import { ShoppingList, Category, Product } from "./logic";

function checkStorage(elementName) {
  return !!localStorage.getItem(elementName);
}

function setStorage(elementName, element) {
  const oldStorage = localStorage.getItem(elementName);
  const newStorage = JSON.stringify(element);
  if (oldStorage === newStorage) return false;
  localStorage.setItem(elementName, JSON.stringify(element));
  return true;
}

function getStorage(elementName) {
  const storedProjects = JSON.parse(localStorage.getItem(elementName));
  Object.setPrototypeOf(storedProjects, ShoppingList.prototype);

  for (let category of storedProjects.categoryList) {
    Object.setPrototypeOf(category, Category.prototype);
    for (let product of category.productList) {
      Object.setPrototypeOf(product, Product.prototype);
    }
  }
  return storedProjects;
}

export { checkStorage, setStorage, getStorage };
