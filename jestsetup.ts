import React from 'react';

// Сделаем функции Enzyme доступными во всех файлах тестов без необходимости импорта importing
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

let context:any = global;

context.shallow = shallow;
context.render = render;
context.mount = mount;
context.React = React;
context.mockStore = mockStore;

global = { ...context };

// Обрушим тест при любой ошибке
console.error = (message: string) => {
    throw new Error(message);
};
