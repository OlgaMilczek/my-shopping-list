function categoryFormValidation(nameInput) {
    if (!nameInput.validity.valid) {
        return false;
    }
    return true;
}

function productFormValidation(
    nameInput,
    quantityInput,
    categorySelector,
    units
) {
    if (!nameInput.validity.valid) {
        return false;
    } else if (!quantityInput.validity.valid) {
        return false;
    } else if (!categorySelector.validity.valid) {
        return false;
    } else if (!units) {
        return false;
    }
    return true;
}

export { categoryFormValidation, productFormValidation };
