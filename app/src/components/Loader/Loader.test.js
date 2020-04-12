import Loader from './Loader';

describe('Loader component scenario', () => {
    it('Loader have right tag <div>', () => {
        const wrapper = shallow(<Loader />);
        expect(wrapper.type()).toBe('div');
    });

    it('Loader have right tag <div>', () => {
        const wrapper = shallow(<Loader />);
        expect(wrapper.text()).toBe('Loading...');
    });
});