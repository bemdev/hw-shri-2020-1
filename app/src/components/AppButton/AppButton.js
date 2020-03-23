import * as React from 'react';
import cn from '../../libs/names/index.js';

import './AppButton.css';

import Icon from '../AppIcon/AppIcon.js';
import Text from '../text/Text.js';

const Button = ({ size, hasIcon, text }) => {
    const blockName = cn('button')({ size: size, with: hasIcon ? 'icon': null });
    const elemName = cn('button', 'text')();
    const theme = cn('theme')({ color: 'project-default' });

    return (
        <button className={`${blockName} ${theme}`}>
            { hasIcon ? <Icon fa={hasIcon}/> : null }
                { text ?
                    <div className={elemName}>
                        <Text content={text}/>
                    </div>
                :
                    <div className={elemName}>
                        <Text content={'Sample text'}/>
                    </div>
                }
        </button>
    );
};

export default Button;
