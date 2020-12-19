import {editCategoryForm, editProductForm} from './forms-edit';
import {createElementWithClasses, creteIconButtonGroup, createElementWithAttributes, appendToContainer, creatLabel} from './DOMmanipulator.js';

function renderList(shoppingList) {
    
    const shoppingListContainer = document.querySelector('.shopping-list');
    shoppingListContainer.innerHTML = '';

    for (let category in shoppingList.productsDict) {
        let categoryListContainer = createElementWithClasses('div', ['shopping-list__category']);
        let categoryHeadingContainer = createElementWithClasses('div', ['shopping-list__category-name']);
        const categoryName = document.createElement('h4');
        categoryName.textContent = category;
        const [btnGroup, editBtn, dellButton] = creteIconButtonGroup();

        //Add event listers for buttons
        editBtn.addEventListener('click', () => {
            editCategoryForm(shoppingList, category);
        });
        dellButton.addEventListener('click', () => {
            shoppingList.deleteCategory(category);
        });
        
        categoryHeadingContainer = appendToContainer(categoryHeadingContainer, [categoryName, btnGroup]);
        categoryListContainer.appendChild(categoryHeadingContainer);

        shoppingList.productsDict[category].forEach(product => {
            let elementContainer = createElementWithClasses('div', ['shopping-list__element']);
            let leftContainer = createElementWithClasses('div', ['u-flex-left']);
            let rightContainer = createElementWithClasses('div', ['u-flex-right', 'shopping-list__element-details']);
            //Left side elements
            let checkbox = createElementWithAttributes('input', 
                [
                    ['type', 'checkbox'],
                    ['id', product],

                ]);
            checkbox.classList.add('shopping-list__checkbox-input');
            let label = creatLabel(['shopping-list__checkbox-label'], product.nam, product.name);
            let inputSpan = createElementWithClasses('span', ['shopping-list__checkbox-mark']);
            let spanIcon = createElementWithClasses('i', ['fas fa-check']);
            inputSpan.appendChild(spanIcon);
            
            //Right side elements
            let quantity = document.createElement('span');
            quantity.textContent = product.quantity;
            const [btnGroup, editBtn, dellButton] = creteIconButtonGroup();
            //Add event listers for buttons
            editBtn.addEventListener('click', () => {
                editProductForm(shoppingList, category, product);
            });
            dellButton.addEventListener('click', () => {
                shoppingList.deleteProduct(product, category);
            });

            //Adding elements to left side
            leftContainer = appendToContainer(leftContainer, [checkbox, label, inputSpan]);
            
            //Adding elements to right side
            rightContainer = appendToContainer(rightContainer, [quantity, btnGroup]);
            
            //Adding to element container
            elementContainer = appendToContainer(elementContainer, [leftContainer, rightContainer]);
            categoryListContainer.appendChild(elementContainer);
        });
        //Adding to general container 
        shoppingListContainer.appendChild(categoryListContainer);
    }
}

export {renderList};