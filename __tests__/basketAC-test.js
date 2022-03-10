import {
    add_product, ADD_PRODUCT,
    del_product, DEL_PRODUCT,
    clear_basket, CLEAR_BASKET,
} from '../redux/basketAC';

let info = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

test('работа basketAC', () => {
    let addPlant = add_product(1, info);
    expect(addPlant).toEqual({ type: ADD_PRODUCT, productId: 1, objProductInfo: info });

    let delPlant = del_product(1);
    expect(delPlant).toEqual({ type: DEL_PRODUCT, productId: 1});

    let clearBasket = clear_basket();
    expect(clearBasket).toEqual({ type: CLEAR_BASKET});

});