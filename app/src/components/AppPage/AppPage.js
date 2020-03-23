import * as React from 'react';
import cn from '../../libs/names/index.js';

import Header from '../AppHeader/AppHeader.js';
import Footer from '../AppFooter/AppFooter.js';

const Theme = cn('theme')(
    {
        gap: 'small',
        space: 'default',
        size: 'default',
        color: 'project-default'
    }
);

const blockName = `${cn('page')()} ${Theme}`;

const Page = ({children}) => {
    return (
        <div className={blockName}>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default Page;
