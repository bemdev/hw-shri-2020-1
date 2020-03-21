import * as React from 'react';
import Header from '../AppHeader/AppHeader.js';
import Footer from '../AppFooter/AppFooter.js';

const Page = ({children}) => {
    return (
        <div className='page theme_gap_small theme_space_default theme_size_default theme_color_project-default'>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default Page;
