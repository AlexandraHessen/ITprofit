import {
    plantsLoadingAC,PLANTS_LOADING,
    plantsErrorAC,PLANTS_ERROR,
    plantsSetAC,PLANTS_SET,
} from '../redux/plantsAC';

let data = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

test('работа plantsAC', () => {
    let plantsLoad = plantsLoadingAC();
    expect(plantsLoad).toEqual({ type: PLANTS_LOADING});

    let plantsError = plantsErrorAC();
    expect(plantsError).toEqual({ type: PLANTS_ERROR});

    let plantsSet = plantsSetAC(data);
    expect(plantsSet).toEqual({ type: PLANTS_SET, plants: data});

});