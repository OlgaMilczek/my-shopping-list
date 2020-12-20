function createElementWithClasses(type, classArray) {
    const element = document.createElement(type);
    for(let i in classArray){
        element.classList.add(classArray[i]);
    }
    return element;
}

function createElementWithAttributes(type, attributesArray) {
    const element = document.createElement(type);
    for (let i in attributesArray) {
        element.setAttribute(attributesArray[i][0], attributesArray[i][1]);
    }
    return element;
}

function createButton(classArray, id, textContent) {
    const button = createElementWithClasses('button', classArray);
    button.setAttribute('id', id);
    button.textContent = textContent;
    return button;
}

function createIconButton(classArray, iconClasses) {
    const button = createElementWithClasses('button', classArray);
    const icon = createElementWithClasses('i', iconClasses);
    button.appendChild(icon);
    return button;
}

function appendToContainer(container, elementsArray) {
    for(let i in elementsArray) {
        container.appendChild(elementsArray[i]);
    }
    return container;
}

function creatLabel(classArray, forAttribute, textContent) {
    const label = createElementWithClasses('label', classArray);
    label.setAttribute('for', forAttribute);
    label.textContent = textContent;
    return label;
}

function creteIconButtonGroup() {
    //Function for creating buttons for delete and edit element
    let btnGroup = createElementWithClasses('div', ['btn__group']);
    let editBtn = createIconButton(['btn', 'btn__boardless', 'btn__edit'], ['far', 'fa-edit']);
    let dellButton = createIconButton(['btn', 'btn__boardless', 'btn__delete'], ['far', 'fa-trash-alt']);

    appendToContainer(btnGroup, [editBtn, dellButton]);
    return [btnGroup, editBtn, dellButton];
}

export {createElementWithClasses, createElementWithAttributes, createButton, appendToContainer, creatLabel, creteIconButtonGroup};