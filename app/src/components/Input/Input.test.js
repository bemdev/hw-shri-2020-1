import Input from './Input';

describe('Input component scenario', () => {
    it('Input not empty render', () => {
        const wrapper = shallow(<Input />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('Input have element <input>', () => {
        const wrapper = shallow(<Input />);
        expect(
            wrapper
                .find('input')
                .type()
        ).toBe('input');
    });

    it('Input have label of the input', () => {
        const wrapper = shallow(<Input />);
        expect(
            wrapper
                .find('.input__label')
                .isEmptyRender()
        ).toBe(false);
    });
});