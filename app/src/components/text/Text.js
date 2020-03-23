import * as React from 'react';
import cn from '../../libs/names/index.js';

const blockName = cn('text')();

const Text = ({ content }) => {
    return (
        <div className={`${blockName}`}>
            { content }
        </div>
    );
};

export default Text;
