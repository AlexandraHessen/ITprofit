"use strict";

import { checkNameValue, checkEmailValue, checkTelValue, checkMessageValue } from '../services/checkForm';

test('Проверка валидации имени', () => {

  expect(checkNameValue('Mike')).toBe(0);
  
  expect(checkNameValue('Елена')).toBe(0);

  expect(checkNameValue('')).toBe(1);

});

test('Проверка валидации email', () => {

    expect(checkEmailValue('')).toBe(1);
  
    expect(checkEmailValue('test@gmail.com')).toBe(0);
    
    expect(checkEmailValue('test@mail.ru')).toBe(0);

    expect(checkEmailValue('asdfghj')).toBe(2);
  
    expect(checkEmailValue('qwerty@qwerty')).toBe(2);
      
});
  
test('Проверка валидации телефона', () => {

  expect(checkTelValue('+375 (29) 123-45-67')).toBe(0);

  expect(checkTelValue('')).toBe(1);
  
});

  
test('Проверка заполнения сообщения', () => {

  expect(checkMessageValue('qwerty')).toBe(0);
    
  expect(checkMessageValue('aaaaa/ ? , 1234567')).toBe(0);    

  expect(checkMessageValue('')).toBe(1);
    
});