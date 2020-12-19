import {renderList} from './render.js';
import {cancelForm, creatCategoryForm} from './forms-element-creator.js';
import {appendToContainer} from './DOMmanipulator.js';

function editCategoryForm(shoppingList, editedCategory) {
    const categoryForm = creatCategoryForm();
    let categoryName = categoryForm.nameInput.value;
    categoryName = editedCategory;
    
    categoryForm.addButton.addEventListener('click', () => {
        const newCategoryName = categoryForm.nameInput.value;
        if (categoryName === '') {
            alert('Enter a category name');
        }
        else {
            shoppingList.editCategory(editedCategory, newCategoryName);
            renderList(shoppingList);
            cancelForm(categoryForm.form);
        }
    });

    appendToContainer(categoryForm.form, [categoryForm.nameGroup, categoryForm.buttonGroup]);
}

function editProductForm(shoppingList, category, product) {
    return ;
}

export {editCategoryForm, editProductForm}; 