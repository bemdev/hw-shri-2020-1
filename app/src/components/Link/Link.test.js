import Link from './Link';

describe('Link component scenario', () => {
    it('Link not empty render', () => {
        const wrapper = shallow(<Link />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    it('Link have right tag <a>', () => {
        const wrapper = shallow(<Link />);
        expect(wrapper.type()).toBe('a');
    });
});