import { renderList } from './render';

const categoriesContainer = document.querySelector('.shopping-list');

function dragAndDropCategories(shoppingList) {

    if (categoriesContainer.onDrop) {
        //Remove event listener when exist.
        categoriesContainer.removeEventListener('drop', categoriesContainer.onDrop);
    }

    categoriesContainer.onDrop = (e) => {
        e.preventDefault();
        const categoriesDOM =  document.querySelectorAll('.shopping-list__category');
        const afterElement = getDragAfterElement(categoriesDOM, e.clientY);
        const categoryId = Number(e.dataTransfer.getData('categoryId'));
        let newId;
        if (!afterElement) {
            newId = shoppingList.categoryList.length;
            shoppingList.changeCategoryOrder(categoryId, newId);
        } else {
            newId = Number(afterElement.dataset.categoryId);
            shoppingList.changeCategoryOrder(categoryId, newId);
        }
        renderList(shoppingList);
    };

    categoriesContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    categoriesContainer.addEventListener('drop', categoriesContainer.onDrop);

    categoriesContainer.addEventListener('dragenter', (e) => {
        e.preventDefault();
    });
}

function getDragAfterElement(categories, y) {
    const draggableElements = [...categories];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

export default dragAndDropCategories;