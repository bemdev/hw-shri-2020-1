import React from 'react';
import cn from '../../libs/names/index';

import './icon.css';

export interface IconProps {
    fa: string;
    big?: boolean;
}

const Icon: React.FC<IconProps> = ({ fa, big }) => {
    const blockName = cn('icon')({ fa: fa, big: big });

    return <div className={`${blockName}`} />;
};

export default Icon;
