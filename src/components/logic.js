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
        this.productsDict = {};
        this.total = 0;
        categories.forEach(category => {
            this.productsDict[category] = [];
        });
    }

    addProduct(name, quantity, units, category) {
        const newProduct = new Product(name, quantity, units);
        this.productsDict[category].push(newProduct);
        this.sumTotal();
    }

    deleteProduct(removedProduct, category) {
        const newProductList = this.productsDict[category].filter(product => product !== removedProduct);
        this.productsDict[category] = newProductList;
        this.sumTotal();
    }

    addCategory(newCategory) {
        this.productsDict[newCategory] = [];
    }

    sumTotal() {
        /* because shopping list isn't be very big (more than 10^6)
        it shouldn't be a problem to count total after each operation. */
        let newTotal = 0;
        for (let category in this.productsDict) {
            newTotal += this.productsDict[category].reduce((total, product) => {
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
