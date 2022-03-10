"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import ContactsPage from '../pages/ContactsPage';
                    //импортируем файл который будем тестировать

test('ContactsPage', () => {
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create(
    <BrowserRouter>
      <ContactsPage />
    </BrowserRouter>
  );

                            // получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
