import Card from './Card';

describe('Card component scenario', () => {
    it('Card not empty render', () => {
        const wrapper = shallow(<Card item={[]}/>);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('Card full have right view class', () => {
        const wrapper = shallow(<Card view='full' item={[]}/>);
        expect(wrapper.html()).toMatch(/card_view_full/gi);
    });
});