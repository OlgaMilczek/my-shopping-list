import {renderList} from './render.js';
import {cancelForm, creatCategoryForm} from './forms-element-creator.js';
import {appendToContainer} from './DOMmanipulator.js';

function createNewCategory(shoppingList) {
    const categoryForm = creatCategoryForm();
    
    categoryForm.addButton.addEventListener('click', () => {
        const categoryName = categoryForm.nameInput.value;
        if (categoryName === '') {
            alert('Enter a category name');
        }
        else {
            shoppingList.addCategory(categoryName);
            renderList(shoppingList);
            cancelForm(categoryForm.form);
        }
    });

    appendToContainer(categoryForm.form, [categoryForm.nameGroup, categoryForm.buttonGroup]);
}

function creteNewProduct(shoppingList) {
    return;
}

export {createNewCategory, creteNewProduct}; 