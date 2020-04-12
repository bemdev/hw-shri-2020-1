import Page from './Page';
import { Provider } from 'react-redux';

describe('Page component scenario', () => {
    it('Page not empty render', () => {
        const wrapper = shallow(<Page store={mockStore()} />);
        expect(wrapper.isEmptyRender()).toBe(false);
    });

    // it('Page render index', () => {
    //     const wrapper = shallow(
    //         <Page store={mockStore(
    //             { 
    //                 modal: { active: false },
    //                 settings: { repoName: 'Test' },
    //                 data: []
    //             }
    //         )}/>
    //     );
    //     expect(wrapper.html()).toBe(false);
    // });

    // it('Page render settings', () => {
    //     const wrapper = shallow(<Page store={mockStore()} />);
    //     expect(wrapper.isEmptyRender()).toBe(false);
    // });

    // it('Page render history', () => {
    //     const wrapper = shallow(<Page store={mockStore()} />);
    //     expect(wrapper.isEmptyRender()).toBe(false);
    // });

    // it('Page render detail-log', () => {
    //     const wrapper = shallow(<Page store={mockStore()} />);
    //     expect(wrapper.isEmptyRender()).toBe(false);
    // });
});