import  {ShoppingList} from './logic';

import {UNITS} from './constants';

test('Create proper shopping list object', () => {
    const categories = ['warzywa', 'owoce'];
    const myShopping = new ShoppingList(categories);
    expect(myShopping.categoryList.length).toBe(2);
    expect(myShopping.categoryList[0].name).toBe('warzywa');
    expect(myShopping.categoryList[1].name).toBe('owoce');
});

test('Add one product properly', () => {
    const categories = ['warzywa', 'owoce'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, myShopping.categoryList[1]);
    expect(myShopping.categoryList[1].productList[0].name).toBe('gruszki');
    expect(myShopping.categoryList[1].productList[0].quantity).toBe(0.5);
    expect(myShopping.categoryList[1].productList[0].units).toBe(UNITS.weight);
    expect(myShopping.categoryList[0].productList).toEqual([]);
});


test('Add multiple product properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, myShopping.categoryList[0]);
    myShopping.addProduct('mleko', 4, UNITS.pcs, myShopping.categoryList[2]);

    expect(myShopping.categoryList[1].productList.length).toBe(2);
    expect(myShopping.categoryList[0].productList.length).toBe(1);
    expect(myShopping.categoryList[2].productList.length).toBe(1);
    expect(myShopping.categoryList[1].productList[1].name).toBe('pomarańcze');
    expect(myShopping.categoryList[1].productList[1].units).toBe(UNITS.weight);
    expect(myShopping.categoryList[0].productList[0].name).toBe('cukinia');
    expect(myShopping.categoryList[2].productList[0].name).toBe('mleko');
});

test('Removing product properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, myShopping.categoryList[0]);

    myShopping.deleteProduct(myShopping.categoryList[1].productList[0], myShopping.categoryList[1]);

    expect(myShopping.categoryList[1].productList.length).toBe(1);
    expect(myShopping.categoryList[1].productList[0].name).toBe('pomarańcze');
});

test('Removing multiply product properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, myShopping.categoryList[0]);

    myShopping.deleteProduct(myShopping.categoryList[1].productList[1], myShopping.categoryList[1]);
    myShopping.deleteProduct(myShopping.categoryList[1].productList[0], myShopping.categoryList[1]);
    myShopping.deleteProduct(myShopping.categoryList[0].productList[0], myShopping.categoryList[0]);
    
    expect(myShopping.categoryList[1].productList.length).toBe(0);
    expect(myShopping.categoryList[0].productList.length).toBe(0);
});

test('Add category properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addCategory('pieczywo');
    
    expect(myShopping.categoryList.length).toBe(4);
});

test('Add multiple categorys properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);

    myShopping.addCategory('pieczywo');
    myShopping.addCategory('mieso i ryby');
    expect(myShopping.categoryList.length).toBe(5);
    expect(myShopping.categoryList[4].name).toBe('mieso i ryby');
});

test('Count quantity correctly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);

    myShopping.addProduct('gruszki', 0.5, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, myShopping.categoryList[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, myShopping.categoryList[0]);
    myShopping.addProduct('mleko', 4, UNITS.pcs, myShopping.categoryList[2]);

    const myShopping2 = new ShoppingList(categories);

    myShopping2.addProduct('gruszki', 0.5, UNITS.weight, myShopping2.categoryList[1]);
    myShopping2.addProduct('mleko', 4, UNITS.pcs, myShopping2.categoryList[2]);
    myShopping2.addProduct('jogurt', 6, UNITS.pcs, myShopping2.categoryList[2]);

    expect(myShopping.total).toBe(7);
    expect(myShopping2.total).toBe(11);
});

