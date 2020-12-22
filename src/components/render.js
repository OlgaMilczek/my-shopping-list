import { editCategoryForm, editProductForm } from './formsEdit';
import {
    createElementWithClasses,
    creteIconButtonGroup,
    createElementWithAttributes,
    appendToContainer,
    creatLabel,
} from './DOMmanipulator.js';

import { setStorage } from './localStorage';
import { NAME, UNITS } from './constants';
import dragAndDropCategories from './dragAndDropCategories';

function renderList(shoppingList) {
    const shoppingListContainer = document.querySelector('.shopping-list');
    shoppingListContainer.innerHTML = '';

    for (let categoryId in shoppingList.categoryList) {
        let category = shoppingList.categoryList[categoryId];
        let categoryListContainer = createElementWithClasses('div', [
            'shopping-list__category',
        ]);
        //Set data for drag and dorp
        categoryListContainer.dataset.categoryId = categoryId;
        categoryListContainer.setAttribute('draggable', 'true');
        categoryListContainer.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('categoryId', categoryId);
            setTimeout(() => {
                categoryListContainer.style.display = 'none';
            }, 0);
        });

        categoryListContainer.addEventListener('dragend', (e) => {
            categoryListContainer.style.display = 'flex';
            e.dataTransfer.clearData('categoryId');
        });

        let categoryHeadingContainer = createElementWithClasses('div', [
            'shopping-list__category-name',
        ]);
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

        category.productList.forEach((product, productId) => {
            let elementContainer = createElementWithClasses('div', [
                'shopping-list__element',
            ]);
            let leftContainer = createElementWithClasses('div', ['u-flex-left']);
            let rightContainer = createElementWithClasses('div', [
                'u-flex-right',
                'shopping-list__element-details',
            ]);
            //Left side elements
            let itemId = `category-${categoryId}_product-${productId}`;
            let checkbox = createElementWithAttributes('input', [
                ['type', 'checkbox'],
                ['id', itemId],
            ]);
            checkbox.classList.add('shopping-list__checkbox-input');
            checkbox.checked = product.bought;
            checkbox.addEventListener('change', () => {
                product.editBought();
                setStorage(NAME, shoppingList);
            });
            let label = creatLabel(
                ['shopping-list__checkbox-label'],
                itemId,
                product.name
            );
            let inputSpan = createElementWithClasses('span', [
                'shopping-list__checkbox-mark',
            ]);
            let spanIcon = createElementWithClasses('i', ['fas', 'fa-check']);
            inputSpan.appendChild(spanIcon);
            label.appendChild(inputSpan);

            //Right side elements
            let quantity = document.createElement('span');
            quantity.textContent = `${product.quantity}  ${(product.units === UNITS.pcs) ? 'pcs.' : product.units}`;
            const [btnGroup, editBtn, dellButton] = creteIconButtonGroup();
            //Add event listers for buttons
            editBtn.addEventListener('click', () => {
                editProductForm(shoppingList, category, categoryId, product);
            });
            dellButton.addEventListener('click', () => {
                shoppingList.deleteProductFromCategory(product, category);
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

    const total = document.getElementById('total');
    total.textContent = shoppingList.total;
    const totalWeight = document.getElementById('total-weight');
    totalWeight.textContent = `${shoppingList.totalWeight} kg`;
    const totalPcs = document.getElementById('total-pieces');
    totalPcs.textContent = `${shoppingList.totalPCS} pcs.`;

    //Drag and drop categories added. 
    dragAndDropCategories(shoppingList);
    //Seting storage
    setStorage(NAME, shoppingList);
}

export { renderList };
