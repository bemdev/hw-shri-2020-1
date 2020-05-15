import Text from './Text';

describe('Text component scenario', () => {
    it('Text have right tag <div>', () => {
        const wrapper = shallow(<Text />);
        expect(wrapper.type()).toBe('div');
    });

    it('Text have right tag <p>', () => {
        const wrapper = shallow(<Text type='p'/>);
        expect(wrapper.type()).toBe('p');
    });

    it('Text have right tag <h1>', () => {
        const wrapper = shallow(<Text type='h1'/>);
        expect(wrapper.type()).toBe('h1');
    });

    it('Text have right tag <h2>', () => {
        const wrapper = shallow(<Text type='h2'/>);
        expect(wrapper.type()).toBe('h2');
    });

    it('Text have right tag <h3>', () => {
        const wrapper = shallow(<Text type='h3'/>);
        expect(wrapper.type()).toBe('h3');
    });
});