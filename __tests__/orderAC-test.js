import {
    add_order, ADD_ORDER,
} from '../redux/orderAC';

let customerInfo = {
    "name":"Jane",
    "surname":"Smith",
    "tel":"+375293186265",
    "email":"jaane.smith1983@gmail.com",
    "delivery":"pickup",
    "payment":"cash",
    "note":""}

let orderInfo = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

test('работа orderAC', () => {
    let addOrder = add_order(customerInfo, orderInfo);
    expect(addOrder).toEqual({ type: ADD_ORDER, objCustomerInfo: customerInfo, objOrderInfo: orderInfo });

});