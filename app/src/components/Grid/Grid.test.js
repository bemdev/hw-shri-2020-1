import Grid from './Grid';

describe('Grid component scenario', () => {
    it('Grid not empty render', () => {
        const wrapper = shallow(<Grid />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});