import * as React from 'react';
import Menu from '../../Menu/Menu';
import Copyright from '../../Copyright/Copyright';

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
