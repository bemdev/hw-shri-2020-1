import React from 'react';
import cn from '../../libs/names';

import Text from '../text/Text.js';

import './__subtitle/title__subtitle.css';

const Title = ({text, subtitle}) => {
    return (
        <div className={cn('title')()}>
            <Text size='xl' type='h2' content={text} />
            <div className={cn('title', 'subtitle')()}>
                <Text size='l' type='h3' content={subtitle} />
            </div>
        </div>
    );
};

export default Title;
