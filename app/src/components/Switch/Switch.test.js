import Switch from './Switch';

describe('Switch component scenario', () => {
    it('Switch not empty render', () => {
        const wrapper = shallow(<Switch href='/' config={[ { path: '/', view: 'index' }]}/>);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});