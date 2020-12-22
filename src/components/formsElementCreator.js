import {
    createElementWithClasses,
    createElementWithAttributes,
    createButton,
    appendToContainer,
    creatLabel,
} from './DOMmanipulator.js';
import { UNITS } from './constants';

function toggleOverlay() {
    const overlay = document.querySelector('#overlay');
    overlay.classList.toggle('active');
}

function cancelForm(form) {
    toggleOverlay();
    form.innerHTML = '';
    form.classList.add('inactive');
}

function activeForm() {
    toggleOverlay();
    const form = document.querySelector('#form');
    form.classList.remove('inactive');
    return form;
}

function createCategoryInput(categories) {
    const categorySelector = createElementWithAttributes('select', [
        ['name', 'category'],
    ]);
    categorySelector.classList.add('form__select');
    categorySelector.required = true;
    //<option value="" disabled selected hidden>Please Choose...</option>
    let placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    placeholderOption.textContent = 'Choose category';

    categorySelector.appendChild(placeholderOption);

    for (let categoryId in categories) {
        const category = categories[categoryId];
        let categoryOption = document.createElement('option');
        categoryOption.value = `${category.name}-${categoryId}`;
        categoryOption.textContent = category.name;
        categorySelector.appendChild(categoryOption);
    }
    return categorySelector;
}

function createCancelButton(form) {
    const cancelButton = createButton(['btn', 'btn__cancel'], 'cancel', 'Cancel');
    cancelButton.addEventListener('click', () => {
        cancelForm(form);
    });

    return cancelButton;
}

function creatCategoryForm() {
    //Function to create elements for category form.
    const form = activeForm();
    //Create label and input form category name.
    const nameLabel = creatLabel(
        ['form__label'],
        'category-name',
        'Category name'
    );
    const nameInput = createElementWithAttributes('input', [
        ['name', 'category-name'],
        ['placeholder', 'Enter category name'],
        ['class', 'form__input'],
    ]);
    nameInput.required = true;
    //Crete div for label and input
    let nameGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(nameGroup, [nameLabel, nameInput]);

    const addButton = createButton(
        ['btn', 'btn__add'],
        'add-category',
        '+ Add new category'
    );
    addButton.setAttribute('type', 'submit');
    const cancelButton = createCancelButton(form);

    let buttonGroup = createElementWithClasses('div', ['btn__group']);
    appendToContainer(buttonGroup, [addButton, cancelButton]);

    return { form, nameInput, addButton, buttonGroup, nameGroup };
}

function createProductForm(categoryList) {
    //Function to create elements for product form.
    const form = activeForm();
    //Create label and input form product name.
    const nameLabel = creatLabel(['form__label'], 'category', 'Product name');
    const nameInput = createElementWithAttributes('input', [
        ['name', 'product-name'],
        ['placeholder', 'Enter product name'],
        ['class', 'form__input'],
    ]);
    nameInput.required = true;
    //Crete div for label and input
    let nameGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(nameGroup, [nameLabel, nameInput]);

    const categoryLabel = creatLabel(
        ['form__label'],
        'category',
        'Choose category'
    );
    let categorySelector = createCategoryInput(categoryList);
    let categoryGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(categoryGroup, [categoryLabel, categorySelector]);

    //Create radio buttons
    const radioContainer = createElementWithClasses('div', [
        'form__group',
        'u-margin-button-medium',
    ]);

    for (let unit in UNITS) {
        const radioGroup = createElementWithClasses('div', ['form__radio-group']);
        const radio = createElementWithAttributes('input', [
            ['type', 'radio'],
            ['id', UNITS[unit]],
            ['value', UNITS[unit]],
            ['name', 'units'],
            ['class', 'form__radio-input'],
        ]);
        if (UNITS[unit] === UNITS.pcs) {
            radio.checked = true;
        }
        const radioLabel = creatLabel(
            ['form__radio-label'],
            UNITS[unit],
            UNITS[unit]
        );
        const radioSpan = createElementWithClasses('span', ['form__radio-button']);

        radioLabel.appendChild(radioSpan);
        appendToContainer(radioGroup, [radio, radioLabel]);
        radioContainer.appendChild(radioGroup);
        radio.addEventListener('change', () => {
            if (radio.value === UNITS.weight && radio.checked) {
                quantityInput.setAttribute('step', '0.1');
                quantityInput.setAttribute('min', '0.1');
            } else {
                if (quantityInput.hasAttribute('step')) {
                    quantityInput.removeAttribute('step');
                    quantityInput.setAttribute('min', '1');
                }
            }
        });
    }

    const quantityLabel = creatLabel(
        ['form__label'],
        'product-quantity',
        'Product quantity'
    );
    const quantityInput = createElementWithAttributes('input', [
        ['name', 'product-quantity'],
        ['type', 'number'],
        ['placeholder', '0'],
        ['class', 'form__input'],
        ['min', '1'],
    ]);
    quantityInput.required = true;
    //Crete div for label and input
    let quantityGroup = createElementWithClasses('div', ['form__group']);
    appendToContainer(quantityGroup, [quantityLabel, quantityInput]);

    const addButton = createButton(
        ['btn', 'btn__add'],
        'add-category',
        '+ Add new product'
    );
    addButton.setAttribute('type', 'submit');
    const cancelButton = createCancelButton(form);

    let buttonGroup = createElementWithClasses('div', ['btn__group']);
    appendToContainer(buttonGroup, [addButton, cancelButton]);

    return {
        form,
        nameInput,
        categorySelector,
        quantityInput,
        nameGroup,
        categoryGroup,
        radioContainer,
        quantityGroup,
        addButton,
        buttonGroup,
    };
}

export { cancelForm, creatCategoryForm, createProductForm };
