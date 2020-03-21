import * as React from 'react';

import Content from './__content/AppHeader__content.js'
import Logo from './__logo/AppHeader__logo.js'

import Button from '../AppButton/AppButton.js'

const Header = () => {
    return (
        <header className='header'>
            <Content>
                <Logo/>
                <Button/>
            </Content>
        </header>
    );
};

export default Header;
