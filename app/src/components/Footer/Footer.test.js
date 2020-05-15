import Footer from './Footer';

describe('Footer component scenario', () => {
    it('Footer not empty render', () => {
        const wrapper = shallow(<Footer/>);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});