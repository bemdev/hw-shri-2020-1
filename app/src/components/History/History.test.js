import History from './History';

describe('History component scenario', () => {
    it('History not empty render', () => {
        const wrapper = shallow(<History items={[ '' ]}/>);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});