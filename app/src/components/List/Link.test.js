import List from './List';

describe('List component scenario', () => {
    const items = ['']

    it('List not empty render', () => {
        const wrapper = shallow(<List items={items}/>);
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});