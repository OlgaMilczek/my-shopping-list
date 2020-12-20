import {renderList} from './render.js';
import {cancelForm, creatCategoryForm} from './forms-element-creator.js';
import {appendToContainer} from './DOMmanipulator.js';

function editCategoryForm(shoppingList, editedCategory) {
    const categoryForm = creatCategoryForm();
    //Change input value for old existing name
    categoryForm.nameInput.value = editedCategory.name;
    categoryForm.addButton.textContent = 'Edit category';
    categoryForm.addButton.addEventListener('click', () => {
        const newCategoryName = categoryForm.nameInput.value;
        if (newCategoryName === '') {
            alert('Enter a category name');
        }
        else {
            editedCategory.changeName(newCategoryName);
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