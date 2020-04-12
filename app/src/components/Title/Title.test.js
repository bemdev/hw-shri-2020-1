import Title from './Title';

describe('Title component scenario', () => {
    it('Title have right tag <div>', () => {
        const wrapper = shallow(<Title />);
        expect(wrapper.type()).toBe('div');
    });
});