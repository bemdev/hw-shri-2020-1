import * as React from 'react';

import Menu from '../../Menu/Menu.js';
import Copyright from '../../Copyright/Copyright.js';

import './footer__content.css';

const Content = () => {
    return (
        <div className='footer__content'>
            <Menu 
                items={
                    [
                        { href: '#', title: 'Support' },
                        { href: '#', title: 'Learning' }
                    ]
                }
            />
            <Copyright />
        </div>
    )
};

export default Content;
