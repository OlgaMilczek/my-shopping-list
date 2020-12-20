import {editCategoryForm, editProductForm} from './forms-edit';
import {createElementWithClasses, creteIconButtonGroup, createElementWithAttributes, appendToContainer, creatLabel} from './DOMmanipulator.js';

function renderList(shoppingList) {
    
    const shoppingListContainer = document.querySelector('.shopping-list');
    shoppingListContainer.innerHTML = '';

    for (let category of shoppingList.categoryList) {
        let categoryListContainer = createElementWithClasses('div', ['shopping-list__category']);
        let categoryHeadingContainer = createElementWithClasses('div', ['shopping-list__category-name']);
        const categoryName = document.createElement('h4');
        categoryName.textContent = category.name;
        const [btnGroup, editBtn, dellButton] = creteIconButtonGroup();

        //Add event listers for buttons
        editBtn.addEventListener('click', () => {
            editCategoryForm(shoppingList, category);
        });
        dellButton.addEventListener('click', () => {
            shoppingList.deleteCategory(category);
            renderList(shoppingList);
        });
        
        appendToContainer(categoryHeadingContainer, [categoryName, btnGroup]);
        categoryListContainer.appendChild(categoryHeadingContainer);

        category.productList.forEach(product => {
            let elementContainer = createElementWithClasses('div', ['shopping-list__element']);
            let leftContainer = createElementWithClasses('div', ['u-flex-left']);
            let rightContainer = createElementWithClasses('div', ['u-flex-right', 'shopping-list__element-details']);
            //Left side elements
            let checkbox = createElementWithAttributes('input', 
                [
                    ['type', 'checkbox'],
                    ['id', product.name],

                ]);
            checkbox.classList.add('shopping-list__checkbox-input');
            checkbox.checked = product.bought;
            checkbox.addEventListener('change', () => {
                product.editBought();
            });
            let label = creatLabel(['shopping-list__checkbox-label'], product.name, product.name);
            let inputSpan = createElementWithClasses('span', ['shopping-list__checkbox-mark']);
            let spanIcon = createElementWithClasses('i', ['fas', 'fa-check']);
            inputSpan.appendChild(spanIcon);
            label.appendChild(inputSpan);
            
            //Right side elements
            let quantity = document.createElement('span');
            quantity.textContent = `${product.quantity}  ${product.units}`;
            const [btnGroup, editBtn, dellButton] = creteIconButtonGroup();
            //Add event listers for buttons
            editBtn.addEventListener('click', () => {
                editProductForm(shoppingList, category, product);
            });
            dellButton.addEventListener('click', () => {
                shoppingList.deleteProduct(product, category);
                renderList(shoppingList);
            });

            //Adding elements to left side
            appendToContainer(leftContainer, [checkbox, label]);
            
            //Adding elements to right side
            appendToContainer(rightContainer, [quantity, btnGroup]);
            
            //Adding to element container
            appendToContainer(elementContainer, [leftContainer, rightContainer]);
            categoryListContainer.appendChild(elementContainer);
        });
        //Adding to general container 
        shoppingListContainer.appendChild(categoryListContainer);
    }
    let totalContainer = createElementWithClasses('div', ['shopping-list__total']);
    let total = document.createElement('p');
    total.textContent = `Total: ${shoppingList.total}`;

    totalContainer.appendChild(total);
    shoppingListContainer.appendChild(totalContainer);
}

export {renderList};