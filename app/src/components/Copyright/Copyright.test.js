import Copyright from './Copyright';

describe('Copyright component scenario', () => {
    it('Copyright not empty render', () => {
        const wrapper = shallow(<Copyright/>);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});