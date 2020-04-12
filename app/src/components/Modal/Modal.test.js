import Modal from './Modal';
import { Provider } from 'react-redux';

describe('Modal component scenario', () => {
    
    it('Modal not empty render', () => {
        const wrapper = shallow(
            <Provider store={mockStore()}>
                <Modal />
            </Provider>
        );
        expect(wrapper.find(Modal).isEmptyRender()).toBe(false);
    });
    
    it('Modal render content', () => {
        const wrapper = shallow(
            <Provider store={mockStore()}>
                <Modal content='Test content' />
            </Provider>
        );
        expect(wrapper.find(Modal).getElement().props.content).toBe('Test content');
    });

});