import * as React from 'react';
import cn from '../../libs/names/index.js';

import Content from './__content/AppHeader__content.js'
import Logo from './__logo/AppHeader__logo.js'

import Button from '../AppButton/AppButton.js'

const blockName = cn('header')();

const Header = () => {
    return (
        <header className={blockName}>
            <Content>
                <Logo/>
                <Button size='l' hasIcon='cogs'/>
            </Content>
        </header>
    );
};

export default Header;
