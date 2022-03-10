"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import combinedReducer from '../redux/reducers.js';
import { Provider } from 'react-redux';
import {add_product, clear_basket} from '../redux/basketAC';

import Basket  from '../components/Basket';
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
store.dispatch(add_product(info.code,info));
expect(Object.keys(store.getState().basket.productsInBasket).length).toBe(1); 

test('BasketWithProdTestButton', () => {
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create(
  <Provider store={store}>
    <BrowserRouter>
      <Basket  basket = {info}/>
    </BrowserRouter>
  </Provider>

  );

                                // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
  
                              // найдём в вёрстке компонента саму кнопку
                              // в верстке <input type="button" value="Очистить корзину" className="BasketButtons" onClick = {this.clearBasket}></input>
                              const buttonAddProductToBasket = component.root.find( el => el.type=='input' && el.props.value == 'Очистить корзину'); 
                              // нажимаем на кнопку
      buttonAddProductToBasket.props.onClick();
  
                              // 2. получаем уже изменённый снэпшот
      componentTree=component.toJSON();
      expect(componentTree).toMatchSnapshot();
  
      store.dispatch(clear_basket());
      expect(Object.keys(store.getState().basket.productsInBasket).length).toBe(0); 

    
});

