import Button, { ButtonProps } from './Button';
import React from 'react';
import { shallow } from 'enzyme';

describe('Button component scenario', () => {
    it('Button have right tag <button>', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.type()).toBe('button');
    });

    // it('Button_variant_link have right tag <a>', () => {
    //     const wrapper = shallow(<Button variant='link' />);
    //     expect(wrapper.type()).toBe('a');
    // });

    // it('Button not empty render', () => {
    //     const wrapper = shallow(<Button />);
    //     expect(wrapper.isEmptyRender()).toBe(false);
    // });
});