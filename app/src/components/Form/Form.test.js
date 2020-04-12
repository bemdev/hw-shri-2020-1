import Form from './Form';

describe('Form component scenario', () => {
    it('Form have right tag <form>', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper.type()).toBe('form');
    });

    it('Form build have right className', () => {
        const wrapper = shallow(<Form type='build'/>);
        expect(wrapper.html()).toMatch(/form_type_build/gi);
    });

    it('Form rebuild have right className', () => {
        const wrapper = shallow(<Form type='rebuild'/>);
        expect(wrapper.html()).toMatch(/form_type_rebuild/gi);
    });
});