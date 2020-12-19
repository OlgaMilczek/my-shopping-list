import {UNITS} from './ constants';

class Product {
    constructor(name, quantity, units) {
        this.name = name;
        this.quantity = quantity;
        this.units = units;
    }

    editQuantity(newQuantity) {
        this.quantity = newQuantity;
    }

    editName(newName) {
        this.name = newName;
    }
}

class ShoppingList {
    constructor(categories) {
        //categories should be ready list of product categories.
        this.productsList = {};
        this.total = 0;
        categories.forEach(category => {
            this.productsList[category] = [];
        });
    }

    addProduct(name, quantity, units, category) {
        const newProduct = new Product(name, quantity, units);
        this.productsList[category].push(newProduct);
    }

    deleteProduct(removedProduct, category) {
        const newProductList = this.productsList[category].filter(product => product !== removedProduct);
        this.productsList[category] = newProductList;
    }

    addCategory(newCategory) {
        this.productsList[newCategory] = [];
    }

    sumTotal() {
        /* because shopping list isn't be very big (more than 10^6)
        it shouldn't be a problem to count total after each operation. */
        let newTotal = 0;
        for (let category in this.productsList) {
            newTotal += this.productsList[category].reduce((total, product) => {
                if (product.units === UNITS.weight) {
                    //if product units are weight then is treated as one pice of product
                    return total + 1;
                }
                else {
                    total += product.quantity;
                }
            }, 0);
        }
        this.total = newTotal;
    }
}

export {ShoppingList};
