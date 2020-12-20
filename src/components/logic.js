import {UNITS} from './constants';

class Product {
    constructor(name, quantity, units) {
        this.name = name;
        this.quantity = Number(quantity);
        this.units = units;
        this.bought = false;
    }

    editQuantity(newQuantity) {
        if (newQuantity !== this.quantity) {
            this.quantity = Number(newQuantity);
        }
    }

    editName(newName) {
        if (newName !== this.name) {
            this.name = newName;
        }
    }

    editUnits(newUnits) {
        if(newUnits !== this.units) {
            this.units = newUnits;
        }
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
        this.totalPCS = 0;
        this.totalWeight = 0;
        categories.forEach(categoryName => {
            const newCategory = new Category(categoryName);
            this.categoryList.push(newCategory);
        });
    }

    addProductToCategory(product, category) {
        category.addProduct(product);
        this.sumTotal();
    }

    deleteProductFromCategory(removedProduct, category) {
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

    changeProductCategory(product, oldCategory, newCategory) {
        this.deleteProductFromCategory(product, oldCategory);
        this.addProductToCategory(product, newCategory);
    }

    sumTotal() {
        /* because shopping list isn't be very big (more than 10^6)
        it shouldn't be a problem to count total after each operation. */
        let newTotal = 0;
        let newTotalPcs = 0;
        let newTotalWeight = 0;
        for (let category of this.categoryList) {
            for (let product of category.productList) {
                if (product.units === UNITS.weight) {
                    //if product units are weight then is treated as one pice of product
                    newTotal += 1;
                    newTotalWeight += product.quantity;
                }
                else {
                    newTotal += product.quantity;
                    newTotalPcs += product.quantity;
                }
            }
        }
        this.total = newTotal;
        this.totalPCS = newTotalPcs;
        this.totalWeight = newTotalWeight;
    }
}

export {ShoppingList, Category, Product};
