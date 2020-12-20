import {renderList} from './render.js';
import {cancelForm, creatCategoryForm, createProductForm} from './forms-element-creator.js';
import {appendToContainer} from './DOMmanipulator.js';
import {UNITS} from './constants';

function editCategoryForm(shoppingList, editedCategory) {
    const categoryForm = creatCategoryForm();
    //Change input value for old existing name
    categoryForm.nameInput.value = editedCategory.name;
    categoryForm.addButton.textContent = 'Edit category';

    function onSubmit(e) {
        e.preventDefault();
        const newCategoryName = categoryForm.nameInput.value;
        editedCategory.changeName(newCategoryName);
        renderList(shoppingList);
        cancelForm(categoryForm.form);
        categoryForm.form.removeEventListener('submit', onSubmit);
    }
    categoryForm.form.addEventListener('submit', onSubmit);

    appendToContainer(categoryForm.form, [categoryForm.nameGroup, categoryForm.buttonGroup]);
}

function editProductForm(shoppingList, category, product) {
    const productForm = createProductForm(shoppingList.categoryList);
    productForm.addButton.textContent = 'Edit product';
    const radios = productForm.radioContainer.querySelectorAll('input[name="units"]');
    let units = product.units;

    radios.forEach(radio => {
        if (radio.value === product.units) {
            radio.checked = true;
            if (radio.value === UNITS.weight) {
                productForm.quantityInput.setAttribute('step', '0.1');
                productForm.quantityInput.setAttribute('min', '0.1');
            }
        }
        radio.addEventListener('change', () => {
            if (radio.value === UNITS.weight && radio.checked) {
                units = radio.value;
            } else {
                units = radio.value;
            }
        });
    });

    productForm.nameInput.value = product.name;
    productForm.quantityInput.value = product.quantity;
    productForm.categorySelector.value = category.name;

    function onSubmit(e) {
        e.preventDefault();
        const productName = productForm.nameInput.value;
        const productQuantity = productForm.quantityInput.value;
        const categoryName = productForm.categorySelector.value;
        const quantityNumber = parseFloat(productQuantity);

        if (categoryName === category.name) {
            product.editQuantity(quantityNumber);
            product.editName(productName);
            product.editUnits(units);
        } else {
            let newCategory = shoppingList.categoryList.filter(category => category.name === categoryName)[0];
            category.deleteProduct(product);
            shoppingList.addProduct(productName, quantityNumber, units, newCategory);
        }
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

export {editCategoryForm, editProductForm}; 