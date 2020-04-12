import Header from './Header';

describe('Header component scenario', () => {
    it('Header not empty render', () => {
        const wrapper = shallow(<Header title={{ repoName: ''}} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});