import plantsReducer from "../redux/plantsReducer"

let data = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

test('работа plantsReducer', () => {
    let state = {};
    state = plantsReducer(state, { type: "PLANTS_LOADING"});
    expect(state).toEqual({"data": null, "status": 1});

    state = plantsReducer(state, { type: "PLANTS_ERROR"});
    expect(state).toEqual({"data": null, "status": 2});

    state = plantsReducer(state, { type: "PLANTS_SET", "plants": data});
    expect(state).toEqual({"data": data, "status": 3});

});