import * as React from 'react';
import cn from '../../../libs/names/index.js';

import './header__content.css';

const elemName = cn('header', 'content')();

const Content = ({ children }) => {
    return (
        <div className={elemName}>
            {children}
        </div>
    )
};

export default Content;
