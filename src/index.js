import  {ShoppingList} from './components/logic';
import {PRODUCT_CATEGORIES, UNITS} from './components/constants';

import {renderList} from './components/render';
import {createNewCategory, creteNewProduct} from './components/forms-add-new';

const myShoppingList = new ShoppingList(PRODUCT_CATEGORIES);

//DOM manipulator. Buttons
const addNewProduct = document.getElementById('adding-buttons-product');
const addCategory = document.getElementById('adding-buttons-category');

//Add event lisiners
addNewProduct.addEventListener('click', () => {
    creteNewProduct(myShoppingList);
});
addCategory.addEventListener('click', () => {
    createNewCategory(myShoppingList);
});

renderList(myShoppingList);