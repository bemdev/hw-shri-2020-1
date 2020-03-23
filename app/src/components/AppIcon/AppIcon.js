import * as React from 'react';
import cn from '../../libs/names/index.js';

import './icon.css';
const blockName = cn('icon')({ fa: 'cogs' });

const Icon = () => {
    return (
        <div className={`${blockName}`}></div>
    );
};

export default Icon;
