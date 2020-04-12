import React from 'react';

// Сделаем функции Enzyme доступными во всех файлах тестов без необходимости импорта importing
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
global.mockStore = mockStore;

// Обрушим тест при любой ошибке
console.error = message => {
    throw new Error(message);
};
