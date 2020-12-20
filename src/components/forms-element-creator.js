import {createElementWithClasses, createElementWithAttributes, createButton, appendToContainer, creatLabel} from './DOMmanipulator.js';
import {UNITS} from './constants';

function toggleOverlay() {
    const overlay = document.querySelector('#overlay');
    overlay.classList.toggle('active');
}

function cancelForm(form) {
    toggleOverlay();
    form.innerHTML = '';
    form.classList.toggle('inactive');
}

function activeForm() {
    toggleOverlay();
    const form = document.querySelector('#form');
    form.classList.toggle('inactive');
    return form;
}

function createCategoryInput(categories) {
    const categorySelector = createElementWithAttributes('select', [['name', 'category']]);
    categorySelector.classList.add('form__select');

    for (let category of categories) {
        let categoryOption = document.createElement('option');
        categoryOption.textContent = category.name;
        categorySelector.appendChild(categoryOption);
    }
    return categorySelector;
}

function createCancelButton(form) {
    const cancelButton = createButton(['btn', 'btn__cancel'],'cancel', 'Cancel');
    cancelButton.addEventListener('click', ()=> {
        cancelForm(form);
    });

    return cancelButton;
}

function creatCategoryForm() {
    //Function to create elements for category form.
    const form = activeForm();
    //Create label and input form category name.
    const nameLabel =  creatLabel(['form__label'], 'category-name','Category name');
    const nameInput = createElementWithAttributes('input', 
        [
            ['name', 'category-name'],
            ['placeholder', 'Enter category name']
        ]);
    nameInput.classList.add('form__input');  
    //Crete div for label and input
    let nameGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(nameGroup, [nameLabel, nameInput]);

    const addButton = createButton(['btn', 'btn__add'],'add-category', '+ Add new category');
    const cancelButton = createCancelButton(form);
    
    let buttonGroup = createElementWithClasses('div', ['btn__group']);
    appendToContainer(buttonGroup, [addButton, cancelButton]);

    return {form, nameInput, addButton, buttonGroup, nameGroup};
}

function createProductForm(categoryList) {
    //Function to create elements for product form.
    const form = activeForm();
    //Create label and input form product name.
    const nameLabel =  creatLabel(['form__label'], 'category','Product name');
    const nameInput = createElementWithAttributes('input', 
        [
            ['name', 'product-name'],
            ['placeholder', 'Enter product name']
        ]);
    nameInput.classList.add('form__input');  
    //Crete div for label and input
    let nameGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(nameGroup, [nameLabel, nameInput]);

    const categoryLabel =  creatLabel(['form__label'], 'category','Choose category');
    let categorySelector = createCategoryInput(categoryList);
    let categoryGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(categoryGroup, [categoryLabel, categorySelector]);
    
    //Create radio buttons
    const radioContainer = createElementWithClasses('div', ['form__group', 'u-margin-button-medium']);

    for (let unit in UNITS) {
        const radioGroup = createElementWithClasses('div', ['form__radio-group']);
        const radio = createElementWithAttributes('input', 
            [
                ['type', 'radio'],
                ['id', UNITS[unit]],
                ['value', UNITS[unit]],
                ['name', 'units'],
                ['min', '0']
            ]);
        radio.classList.add('form__radio-input');

        const radioLabel = creatLabel(['form__radio-label'], UNITS[unit], UNITS[unit]);
        const radioSpan = createElementWithClasses('span', ['form__radio-button']);

        radioLabel.appendChild(radioSpan);
        appendToContainer(radioGroup , [radio, radioLabel]);
        radioContainer.appendChild(radioGroup);
    }

    const quantityLabel =  creatLabel(['form__label'], 'product-quantity','Product quantity');
    const quantityInput = createElementWithAttributes('input', 
        [
            ['name', 'product-quantity'],
            ['type', 'number'],
            ['placeholder', '0']
        ]);
    quantityInput.classList.add('form__input');  
    //Crete div for label and input
    let quantityGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(quantityGroup, [quantityLabel, quantityInput]);

    const addButton = createButton(['btn', 'btn__add'],'add-category', '+ Add new product');
    const cancelButton = createCancelButton(form);
    
    let buttonGroup = createElementWithClasses('div', ['btn__group']);
    appendToContainer(buttonGroup, [addButton, cancelButton]);

    return {form, nameInput, categorySelector, quantityInput, nameGroup, categoryGroup, radioContainer, quantityGroup, addButton, buttonGroup};
}

export {cancelForm, creatCategoryForm, createProductForm};
