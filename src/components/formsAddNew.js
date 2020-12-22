import { Product } from './logic';

import { renderList } from './render.js';
import {
    cancelForm,
    creatCategoryForm,
    createProductForm,
} from './formsElementCreator.js';
import { appendToContainer } from './DOMmanipulator.js';

import {
    categoryFormValidation,
    productFormValidation,
} from './formValidation';

function createNewCategoryForm(shoppingList) {
    const categoryForm = creatCategoryForm();
    function onSubmit(e) {
        e.preventDefault();
        const formValid = categoryFormValidation(categoryForm.nameInput);
        if (formValid) {
            const categoryName = categoryForm.nameInput.value;
            shoppingList.addCategory(categoryName);
            renderList(shoppingList);
            cancelForm(categoryForm.form);
            categoryForm.form.removeEventListener('submit', onSubmit);
        }
    }
    categoryForm.form.addEventListener('submit', onSubmit);
    appendToContainer(categoryForm.form, [
        categoryForm.nameGroup,
        categoryForm.buttonGroup,
    ]);
}

function creteNewProductForm(shoppingList) {
    const productForm = createProductForm(shoppingList.categoryList);

    function onSubmit(e) {
        e.preventDefault();
        const unitsInput = productForm.radioContainer.querySelector(
            'input[name="units"]:checked'
        );
        const formValid = productFormValidation(
            productForm.nameInput,
            productForm.quantityInput,
            productForm.categorySelector,
            unitsInput
        );
        if (formValid) {
            const productName = productForm.nameInput.value;
            const productQuantity = productForm.quantityInput.value;
            const [
                categoryName,
                categoryIdString,
            ] = productForm.categorySelector.value.split('-');
            const categoryId = Number(categoryIdString);

            const category = shoppingList.categoryList.filter(
                (category, id) => category.name === categoryName && id === categoryId
            )[0];
            const productUnits = unitsInput.value;
            const newProduct = new Product(productName, productQuantity, productUnits);
            shoppingList.addProductToCategory(newProduct, category);

            renderList(shoppingList);
            cancelForm(productForm.form);
            productForm.form.removeEventListener('submit', onSubmit);
        }
    }
    productForm.form.addEventListener('submit', onSubmit);

    appendToContainer(productForm.form, [
        productForm.nameGroup,
        productForm.categoryGroup,
        productForm.radioContainer,
        productForm.quantityGroup,
        productForm.buttonGroup,
    ]);
}

export { createNewCategoryForm, creteNewProductForm };
