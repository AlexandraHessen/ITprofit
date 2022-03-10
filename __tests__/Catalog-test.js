"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import combinedReducer from '../redux/reducers.js';
import { Provider } from 'react-redux';

import Catalog from '../components/Basket';
                    //импортируем файл который будем тестировать

let plantsArr = [
    {
		"code": 1,
		"name": "Замиокулькас",
		"category": "deciduous",
		"price": 265,
		"description": "Полив по мере полного просыхания земляного кома, раз в 10-15 дней, в опрыскивании не нуждается. Чрезмерный полив замиокулькасов может приводить к пожелтению листьев.",
		"imgUrl": "/img/img_9241_1.jpg"
	},
	{
		"code": 2,
		"name": "Филодендрон Malay Gold",
		"category": "deciduous",
		"price": 95,
		"description": "Кашпо на фото не входит в стоимость, растение продается в пластиковом техническом горшочке",
		"imgUrl": "/img/img_6587.jpg"
	},
	{
		"code": 3,
		"name": "Монстера Monkey Leaf",
		"category": "deciduous",
		"price": 385,
		"description": "Стоимость указана за одно растение в техническом горшке, кашпо на фото не входит в стоимость",
		"imgUrl": "/img/img_6129.jpg"
	},
	{
		"code": 4,
		"name": "Аспелениум",
		"category": "deciduous",
		"price": 58,
		"description": "Стоимость указана за одно растение в техническом горшке, кашпо на фото не входит в стоимость",
		"imgUrl": "/img/img_6162_2.jpg"
	},
	{
		"code": 5,
		"name": "Кхенанта Amagris",
        "category": "deciduous",
		"price": 45,
		"description": "Стоимость указана за растение в техническом пластиковом горшке, кашпо на фото не входит в стоимость.",
		"imgUrl": "/img/img_6053.jpg"
	},
	{
		"code": 6,
		"name": "Кордилина",
        "category": "deciduous",
		"price": 32,
		"description": "Кашпо не входит в стоимость",
		"imgUrl": "/img/img_5677.jpg"
	},
	{
		"code": 7,
		"name": "Бонсай Гинсенг в керамике",
        "category": "deciduous",
		"price": 105,
		"description": "Кашпо входит в стоимость",
		"imgUrl": "/img/img_3604_1.jpg"
	},
	{
		"code": 8,
		"name": "Замиокулкас",
        "category": "deciduous",
		"price": 47,
		"description": "Стоимость указана за растение в пластиковом техническом горшке, керамическое кашпо не входит в стоимость.",
		"imgUrl": "/img/img_4001.jpg"
	},
	{
		"code": 9,
		"name": "Шефлера",
        "category": "deciduous",
		"price": 315,
		"description": "Стоимость указана за растение в пластиковом горшке.",
		"imgUrl": "/img/img_0019.jpg"
	},
	{
		"code": 10,
		"name": "Фикус микс",
        "category": "deciduous",
		"price": 45,
		"description": "Растения представлены миксом, наличие нужного сорта уточняйте у специалистов салона. Стоимость указана за растение в пластиковом горшке. Подобрать кашпо или заказать вариант, представленный на фото, можно в салоне.",
		"imgUrl": "/img/img_3543.jpg"
	},
	{
		"code": 11,
		"name": "Бонсай Фикус Гинсенг",
        "category": "deciduous",
		"price": 21,
		"description": "Керамическое кашпо не входит в стоимость, растение продается в техническом горшочке",
		"imgUrl": "/img/img_4948.jpg"
	},
	{
		"code": 12,
		"name": "Пуансетия",
        "category": "deciduous",
		"price": 25,
		"description": "Стоимость указана за растение в техническом пластиковом горшке без учета керамического кашпо.",
		"imgUrl": "/img/img_6779_2.jpg"
	},
    {
		"code": 13,
		"name": "Сциндапсус Argyraeus",
        "category": "deciduous",
		"price": 25,
		"description": "Сциндапсус предпочитает расти в тени, либо полутени. Поливать растение требуется только после того, как 1/3 часть грунта просохнет. ",
		"imgUrl": "/img/img_0204.jpg"
	},
	{
		"code": 14,
		"name": "Мирт communis",
        "category": "deciduous",
		"price": 85,
		"description": "Главное для мирта – постоянный равномерный полив без перерывов и поддержание повышенной влажности воздуха. Почва всегда должна быть увлажнена, поэтому в зависимости от условий в комнате мирт в среднем стоит поливать ежедневно или через день. ",
		"imgUrl": "/img/img_6697_1.jpg"
	},
	{
		"code": 15,
		"name": "Маранта Керховена",
        "category": "deciduous",
		"price": 23,
		"description": "Стоимость указана за растение в пластиковом горшке. Подобрать кашпо или заказать вариант, представленный на фото, можно в салоне.",
		"imgUrl": "/img/img_9319.jpg"
	}
]

let pageNumber = 2;
let store=createStore(combinedReducer);

test('Catalog', () => {
                            // создаём тестовую версию компонента который будем тестировать
  const component = renderer.create(
  <Provider store={store}>
    <BrowserRouter>
      <Catalog plantsArr = {plantsArr} pageNumber = {pageNumber}/>
    </BrowserRouter>
  </Provider>

  );

                            // получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
