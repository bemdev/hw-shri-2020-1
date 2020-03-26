import React, { useState, useEffect } from 'react';
import cn from '../../libs/names/index.js';

import Content from './__content/AppHeader__content.js';
import Logo from './__logo/AppHeader__logo.js';

import Button from '../AppButton/AppButton.js';

const blockName = cn('header')();

const Header = (props) => {
    const [title, setTitle] = useState();

    useEffect(() => {
        props.title && props.title.then(result => {
            setTitle(result.data.repoName);
        });
    }, [props.title]);

	return (
		<header className={blockName}>
			<Content>
				<Logo title={title} />
				<Button size='l' hasIcon='cogs' text='Settings' />
			</Content>
		</header>
	);
};

export default Header;
