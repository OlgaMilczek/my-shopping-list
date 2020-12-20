import {renderList} from './render.js';
import {cancelForm, creatCategoryForm, createProductForm} from './forms-element-creator.js';
import {appendToContainer} from './DOMmanipulator.js';
import {UNITS} from './constants';


function createNewCategory(shoppingList) {
    const categoryForm = creatCategoryForm();
    function onSubmit(e) {
        e.preventDefault();
        const categoryName = categoryForm.nameInput.value;
        shoppingList.addCategory(categoryName);
        renderList(shoppingList);
        cancelForm(categoryForm.form);
        categoryForm.form.removeEventListener('submit', onSubmit);
        
    }
    
    categoryForm.form.addEventListener('submit', onSubmit);

    appendToContainer(categoryForm.form, [categoryForm.nameGroup, categoryForm.buttonGroup]);
}

function creteNewProduct(shoppingList) {
    const productForm = createProductForm(shoppingList.categoryList);
    const radios = productForm.radioContainer.querySelectorAll('input[name="units"]');
    let units = null;

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === UNITS.weight && radio.checked) {
                units = radio.value;
            } else {
                units = radio.value;
            }
        });
    }); 

    function onSubmit(e) {
        e.preventDefault();
        const productName = productForm.nameInput.value;
        const productQuantity = productForm.quantityInput.value;
        const categoryName = productForm.categorySelector.value;

        const category = shoppingList.categoryList.filter(category => category.name === categoryName)[0];
        const quantityNumber = parseFloat(productQuantity);
        shoppingList.addProduct(productName, quantityNumber, units, category);

        renderList(shoppingList);
        cancelForm(productForm.form);
        productForm.form.removeEventListener('submit', onSubmit);
    }

    productForm.form.addEventListener('submit', onSubmit);

    appendToContainer(productForm.form, 
        [
            productForm.nameGroup,
            productForm.categoryGroup,
            productForm.radioContainer,
            productForm.quantityGroup,
            productForm.buttonGroup,
        ]);
}

export {createNewCategory, creteNewProduct}; 