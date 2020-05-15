import Menu from './Menu';

describe('Menu component scenario', () => {
    it('Menu have right tag <ul>', () => {
        const wrapper = shallow(<Menu items={[]}/>);
        expect(wrapper.type()).toBe('ul');
    });
});