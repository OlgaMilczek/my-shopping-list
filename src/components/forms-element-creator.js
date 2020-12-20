import {createElementWithClasses, createElementWithAttributes, createButton, appendToContainer, creatLabel} from './DOMmanipulator.js';

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

function createCategoryInput(categories){
    const categorySelector = createElementWithAttributes('select', [['name', 'category']]);
    categorySelector.classList.add('form__select');

    for (let category in categories) {
        let categoryOption = document.createElement('option');
        categoryOption.textContent = category;
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
    //Creete div for label and input
    let nameGroup = createElementWithClasses('div', ['form__group']);
    nameGroup = appendToContainer(nameGroup, [nameLabel, nameInput]);

    const addButton = createButton(['btn', 'btn__add'],'add-category', '+ Add new category');
    const cancelButton = createCancelButton(form);
    
    let buttonGroup = createElementWithClasses('div', ['btn__group']);
    buttonGroup = appendToContainer(buttonGroup, [addButton, cancelButton]);

    return {form, nameInput, addButton, buttonGroup, nameGroup};
}

export {cancelForm, creatCategoryForm};
