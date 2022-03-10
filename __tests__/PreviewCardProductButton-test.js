"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import combinedReducer from '../redux/reducers.js';
import { Provider } from 'react-redux';
import {add_product} from '../redux/basketAC'

import PreviewCardProduct from '../components/PreviewCardProduct';
                    //импортируем файл который будем тестировать

let info = 	{
    "code": 1,
    "name": "Замиокулькас",
    "category": "deciduous",
    "price": 265,
    "description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
    "imgUrl": "/img/img_9241_1.jpg"
}

let pageNumber=1
let store=createStore(combinedReducer);

test('PreviewCardProduct', () => {
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create( //с нужными данными для построения
        <Provider store={store}>
          <BrowserRouter>
            <PreviewCardProduct info = {info} pageNumber = {pageNumber} />  
          </BrowserRouter>
        </Provider>
  );

                            // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

                            // найдём в вёрстке компонента саму кнопку
                            // в верстке <input type="button" value="Все" onClick={this.allClients}/>
                            const buttonAddProductToBasket = component.root.find( el => el.type=='button'); 
                            // нажимаем на кнопку
    buttonAddProductToBasket.props.onClick();

                            // 2. получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    store.dispatch(add_product(info.code,info));
    expect(Object.keys(store.getState().basket.productsInBasket).length).toBe(1); 
});
