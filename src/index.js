import {ShoppingList} from './components/logic';
import {renderList} from './components/render';
import {createNewCategory, creteNewProduct} from './components/forms-add-new';
import {PRODUCTCATEGORIES} from './components/constants';

//const PRODUCTCATEGORIES = ['warzywa', 'owoce', 'nabiał', 'mięso i ryby', 'artykuły higieniczne', 'pieczywo', 'produkty suche'];

const myShoppingList = new ShoppingList(PRODUCTCATEGORIES);

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