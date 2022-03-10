"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import combinedReducer from '../redux/reducers.js';
import { Provider } from 'react-redux';

import Header from '../components/Header';
                    //импортируем файл который будем тестировать

let store=createStore(combinedReducer);

test('Header', () => {
                            // создаём тестовую версию компонента который будем тестировать
                            const component = renderer.create(
    <Provider store={store}>
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    </Provider>
    );

                            // получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
