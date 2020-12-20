import {renderList} from './render.js';
import {cancelForm, creatCategoryForm, createProductForm} from './forms-element-creator.js';
import {appendToContainer} from './DOMmanipulator.js';
import {UNITS} from './constants';

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
    const productForm = createProductForm(shoppingList.categoryList);
    const radios = productForm.radioContainer.querySelectorAll('input[name="units"]');
    let units = null;

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === UNITS.weight && radio.checked) {
                units = radio.value;
                productForm.quantityInput.setAttribute('step', '0.01');
            } else {
                units = radio.value;
                productForm.quantityInput.setAttribute('step', '1');
            }
        });
    }); 

    productForm.addButton.addEventListener('click', () => {
        const productName = productForm.nameInput.value;
        const productQuantity = productForm.quantityInput.value;
        const categoryName = productForm.categorySelector.value;

        if (productName === '' || productQuantity === '') {
            alert('Enter name and quantity');
        } else if (units === null) {
            alert('Choose units');
        } else {
            const category = shoppingList.categoryList.filter(category => category.name === categoryName)[0];
            const quantityNumber = parseFloat(productQuantity);
            shoppingList.addProduct(productName, quantityNumber, units, category);
            renderList(shoppingList);
            cancelForm(productForm.form);
        }
    });

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