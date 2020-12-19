import  {ShoppingList} from './logic';

import {UNITS} from './ constants';

test('Create proper shopping list object', () => {
    const categories = ['warzywa', 'owoce'];
    const myShopping = new ShoppingList(categories);
    expect(myShopping.productsDict[categories[0]]).toEqual([]);
    expect(myShopping.productsDict[categories[1]]).toEqual([]);
});

test('Add one product properly', () => {
    const categories = ['warzywa', 'owoce'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    expect(myShopping.productsDict[categories[1]][0].name).toBe('gruszki');
    expect(myShopping.productsDict[categories[1]][0].quantity).toBe(0.5);
    expect(myShopping.productsDict[categories[1]][0].units).toBe(UNITS.weight);
    expect(myShopping.productsDict[categories[0]]).toEqual([]);
});


test('Add multiple product properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, categories[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, categories[0]);
    myShopping.addProduct('mleko', 4, UNITS.pcs, categories[2]);

    expect(myShopping.productsDict[categories[1]].length).toBe(2);
    expect(myShopping.productsDict[categories[0]].length).toBe(1);
    expect(myShopping.productsDict[categories[2]].length).toBe(1);
    expect(myShopping.productsDict[categories[1]][1].name).toBe('pomarańcze');
    expect(myShopping.productsDict[categories[1]][1].units).toBe(UNITS.weight);
    expect(myShopping.productsDict[categories[0]][0].name).toBe('cukinia');
    expect(myShopping.productsDict[categories[2]][0].name).toBe('mleko');
});

test('Removing product properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, categories[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, categories[0]);

    myShopping.deleteProduct(myShopping.productsDict[categories[1]][0], categories[1]);

    expect(myShopping.productsDict[categories[1]].length).toBe(1);
    expect(myShopping.productsDict[categories[1]][0].name).toBe('pomarańcze');
    expect(myShopping.productsDict[categories[1]][1]).toBeUndefined();
});

test('Removing multiply product properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, categories[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, categories[0]);

    myShopping.deleteProduct(myShopping.productsDict[categories[1]][1], categories[1]);
    myShopping.deleteProduct(myShopping.productsDict[categories[1]][0], categories[1]);
    myShopping.deleteProduct(myShopping.productsDict[categories[0]][0], categories[0]);
    
    expect(myShopping.productsDict[categories[1]].length).toBe(0);
    expect(myShopping.productsDict[categories[0]].length).toBe(0);
});

test('Add category properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, categories[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, categories[0]);

    myShopping.addCategory('pieczywo');
    
    expect(myShopping.productsDict.pieczywo).toEqual([]);
});

test('Add multiple properly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);
    myShopping.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, categories[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, categories[0]);

    myShopping.addCategory('pieczywo');
    myShopping.addCategory('mieso i ryby');
    
    expect(myShopping.productsDict.pieczywo).toEqual([]);
    expect(myShopping.productsDict['mieso i ryby']).toEqual([]);
});

test('Count quantity correctly', () => {
    const categories = ['warzywa', 'owoce', 'nabiał'];
    const myShopping = new ShoppingList(categories);

    myShopping.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    myShopping.addProduct('pomarańcze', 0.3, UNITS.weight, categories[1]);
    myShopping.addProduct('cukinia', 2, UNITS.weight, categories[0]);
    myShopping.addProduct('mleko', 4, UNITS.pcs, categories[2]);

    const myShopping2 = new ShoppingList(categories);

    myShopping2.addProduct('gruszki', 0.5, UNITS.weight, categories[1]);
    myShopping2.addProduct('mleko', 4, UNITS.pcs, categories[2]);
    myShopping2.addProduct('jogurt', 6, UNITS.pcs, categories[2]);

    expect(myShopping2.total).toBe(11);
});

