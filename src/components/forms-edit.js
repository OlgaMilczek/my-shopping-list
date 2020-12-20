import {Product} from './logic';
import {renderList} from './render.js';
import {cancelForm, creatCategoryForm, createProductForm} from './forms-element-creator.js';
import {appendToContainer} from './DOMmanipulator.js';
import {UNITS} from './constants';
import {categoryFormValidation, productFormValidation} from './formValidation';

function editCategoryForm(shoppingList, editedCategory) {
    const categoryForm = creatCategoryForm();
    //Change input value for old existing name
    categoryForm.nameInput.value = editedCategory.name;
    categoryForm.addButton.textContent = 'Edit category';

    function onSubmit(e) {
        e.preventDefault();
        const formValid = categoryFormValidation(categoryForm.nameInput);
        if (formValid) {
            const newCategoryName = categoryForm.nameInput.value;
            editedCategory.changeName(newCategoryName);
            renderList(shoppingList);
            cancelForm(categoryForm.form);
            categoryForm.form.removeEventListener('submit', onSubmit);
        }
    }
    categoryForm.form.addEventListener('submit', onSubmit);

    appendToContainer(categoryForm.form, [categoryForm.nameGroup, categoryForm.buttonGroup]);
}

function editProductForm(shoppingList, category, categoryId, product) {
    const productForm = createProductForm(shoppingList.categoryList);
    productForm.addButton.textContent = 'Edit product';
    const radio = productForm.radioContainer.querySelector(`input[id=${product.units}]`);
    console.log(radio);

    radio.checked = true;
    if (product.units === UNITS.weight) {
        productForm.quantityInput.setAttribute('step', '0.1');
        productForm.quantityInput.setAttribute('min', '0.1');
    }

    productForm.nameInput.value = product.name;
    productForm.quantityInput.value = product.quantity;
    productForm.categorySelector.value = `${category.name}-${categoryId}`;

    console.log(productForm.categorySelector.value);

    function onSubmit(e) {
        e.preventDefault();
        const units = productForm.radioContainer.querySelector('input[name="units"]:checked').value;
        const formValid = productFormValidation(productForm.nameInput, productForm.quantityInput, productForm.categorySelector, units);
        if (formValid) {
            const productName = productForm.nameInput.value;
            const productQuantity = productForm.quantityInput.value;
            const [newCategoryName, newCategoryIdString] = productForm.categorySelector.value.split('-');
            const newCategoryId = Number(newCategoryIdString);
    
            if (newCategoryName === category.name && categoryId === newCategoryId) {
                product.editQuantity(productQuantity);
                product.editName(productName);
                product.editUnits(units);
                shoppingList.sumTotal();
            } else {
                //Product have new category
                let newCategory = shoppingList.categoryList.filter((category, id) => {
                    if (category.name === newCategoryName && id === newCategoryId) {
                        return category;
                    }
                })[0];
                shoppingList.deleteProductFromCategory(product, category);
                const newProduct = new Product (productName, productQuantity, units);
                shoppingList.addProductToCategory(newProduct, newCategory);
            }
            renderList(shoppingList);
            cancelForm(productForm.form);
            productForm.form.removeEventListener('submit', onSubmit);
        }
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