import * as React from 'react';

import './header__content.css';

const Content = ({ children }) => {
    return (
        <div className='header__content'>
            {children}
        </div>
    )
};

export default Content;
