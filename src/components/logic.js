import {UNITS} from './constants';

class Product {
    constructor(name, quantity, units) {
        this.name = name;
        this.quantity = quantity;
        this.units = units;
        this.bought = false;
    }

    editQuantity(newQuantity) {
        this.quantity = newQuantity;
    }

    editName(newName) {
        this.name = newName;
    }

    editUnits(newUnits) {
        this.units = newUnits;
    }

    editBought() {
        this.bought = !this.bought;
    }
}

class Category {
    constructor(name) {
        this.name = name; 
        this.productList = [];
    }

    changeName(newName) {
        this.name = newName;
    }

    addProduct(product) {
        this.productList.push(product);
    }

    deleteProduct(removedProduct) {
        const newProductList = this.productList.filter((product) => product !== removedProduct);
        this.productList = newProductList;
    }
}

class ShoppingList {
    constructor(categories) {
        //categories should be ready list of product categories.
        this.categoryList = [];
        this.total = 0;
        categories.forEach(categoryName => {
            const newCategory = new Category(categoryName);
            this.categoryList.push(newCategory);
        });
    }

    addProduct(name, quantity, units, category) {
        const newProduct = new Product(name, quantity, units);
        category.addProduct(newProduct);
        this.sumTotal();
    }

    deleteProduct(removedProduct, category) {
        category.deleteProduct(removedProduct);
        this.sumTotal();
    }

    addCategory(categoryName) {
        const newCategory = new Category(categoryName);
        this.categoryList.push(newCategory);
    }

    deleteCategory(removedCategory) {
        const newCategoryList = this.categoryList.filter(category => category !== removedCategory);
        this.categoryList = newCategoryList;
        this.sumTotal();
    }

    sumTotal() {
        /* because shopping list isn't be very big (more than 10^6)
        it shouldn't be a problem to count total after each operation. */
        let newTotal = 0;
        for (let category of this.categoryList) {
            newTotal += category.productList.reduce((total, product) => {
                if (product.units === UNITS.weight) {
                    //if product units are weight then is treated as one pice of product
                    return total + 1;
                }
                else {
                    return total + product.quantity;
                }
            }, 0);
        }
        this.total = newTotal;
    }
}

export {ShoppingList};
