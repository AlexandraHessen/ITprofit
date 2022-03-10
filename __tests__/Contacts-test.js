"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import Contacts from '../components/Contacts';
                    //импортируем файл который будем тестировать

test('Contacts', () => {
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create(
    <BrowserRouter>
      <Contacts />
    </BrowserRouter>
  );

                            // получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
