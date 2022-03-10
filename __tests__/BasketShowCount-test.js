"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import combinedReducer from '../redux/reducers.js';
import { Provider } from 'react-redux';

import BasketShowCount  from '../components/BasketShowCount';
                    //импортируем файл который будем тестировать

let info = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

let store=createStore(combinedReducer);

test('BasketShowCount ', () => {
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create(
  <Provider store={store}>
    <BrowserRouter>
      <BasketShowCount  basket = {info}/>
    </BrowserRouter>
  </Provider>

  );

                            // получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
