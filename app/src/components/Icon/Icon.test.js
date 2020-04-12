import Icon from './Icon';

describe('Icon component scenario', () => {
    it('Icon not empty render', () => {
        const wrapper = shallow(<Icon />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('Icon have right classNames', () => {
        const wrapper = shallow(<Icon fa='cogs'/>);
        expect(wrapper.html()).toMatch(/icon icon_fa_cogs/gi);
    });
});