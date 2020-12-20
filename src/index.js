import {ShoppingList} from './components/logic';
import {renderList} from './components/render';
import {createNewCategoryForm, creteNewProductForm} from './components/forms-add-new';
import {checkStorage, getStorage} from './components/localStorage';

import {PRODUCTCATEGORIES, NAME} from './components/constants';

let myShoppingList; 

if (checkStorage(NAME)) {
    myShoppingList = getStorage(NAME);
} else {
    myShoppingList = new ShoppingList(PRODUCTCATEGORIES);
}

//DOM manipulator. Buttons
const addNewProduct = document.getElementById('adding-buttons-product');
const addCategory = document.getElementById('adding-buttons-category');

//Add event listeners
addNewProduct.addEventListener('click', () => {
    creteNewProductForm(myShoppingList);
});
addCategory.addEventListener('click', () => {
    createNewCategoryForm(myShoppingList);
});

renderList(myShoppingList);