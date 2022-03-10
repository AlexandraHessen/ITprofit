import orderReducer from "../redux/orderReducer"

let objOrderInfo = {
    "name":"Jane",
    "surname":"Smith",
    "tel":"+375293186265",
    "email":"jaane.smith1983@gmail.com",
    "delivery":"pickup",
    "payment":"cash",
    "note":""}

let objCustomerInfo = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

test('работа orderReducer', () => {
    let state = {};
    state = {orders: []};
    state = orderReducer(state, { type: "ADD_ORDER", "objCustomerInfo": objCustomerInfo, "objOrderInfo": objOrderInfo });
    expect(state).toEqual({orders: [{"objCustomerInfo": objCustomerInfo, "products": objOrderInfo }]});

});
