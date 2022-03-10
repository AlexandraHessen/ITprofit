import basketReducer from "../redux/basketReducer"

let info = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

test('работа basketReducer', () => {
    let state = {};
    state = basketReducer(state, { type: "ADD_PRODUCT", productId: "1", objProductInfo: info });
    expect(state).toEqual({productsInBasket: {"1": info}});

    state = basketReducer(state, { type: "DEL_PRODUCT", productId: "1" });
    expect(state).toEqual({productsInBasket: {}});

    state = basketReducer(state, { type: "CLEAR_BASKET"});
    expect(state).toEqual({productsInBasket: {}});

});