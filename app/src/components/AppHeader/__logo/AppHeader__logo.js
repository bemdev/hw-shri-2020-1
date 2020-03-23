import * as React from 'react';
import cn from '../../../libs/names/index.js';

import './header__logo.css';
import '../../text/_size/text_size_xxxl.css';

const text = cn('text')({ size: 'xxxl'});
const theme = cn('theme')({ color: 'project-inverse'});

const elemName = `${cn('header', 'logo')()} ${text} ${theme}`;

const Logo = () => {
    return (
        <div className={elemName}>
            School CI server
        </div>
    )
};

export default Logo;
