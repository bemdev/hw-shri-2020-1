import Log from './Log';

describe('Log component scenario', () => {
    it('Log have right tag <div>', () => {
        const wrapper = shallow(<Log text=''/>);
        expect(wrapper.type()).toBe('div');
    });
});