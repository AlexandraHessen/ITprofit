"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import Footer from '../components/Footer';
                    //импортируем файл который будем тестировать

test('Footer', () => {
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

                            // получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
