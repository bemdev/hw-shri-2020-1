import * as React from 'react';
import cn from '../../../libs/names/index';

import './header__content.css';

const elemName = cn('header', 'content')();

interface HeaderContentProps {
    children: any;
}

const Content: React.FC<HeaderContentProps> = ({ children }) => {
    return (
        <div className={elemName}>
            {children}
        </div>
    )
};

export default Content;
