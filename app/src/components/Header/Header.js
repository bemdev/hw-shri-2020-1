import React, { useState, useEffect } from 'react';
import cn from '../../libs/names/index.js';

import Content from './__content/HeaderContent.js';
import Logo from './__logo/HeaderLogo.js';

const blockName = cn('header')();

const Header = (props) => {
	const [title, setTitle] = useState();

	useEffect(() => {
		props.title &&
			props.title.then((result) => {
				setTitle(result.data.repoName);
			});
	}, [props.title]);

	return (
		<header className={blockName}>
			<Content>
				<Logo title={title} color={props.color || 'inverse'} />
				<div className={cn('header', 'control')()}>{props.children}</div>
			</Content>
		</header>
	);
};

export default Header;
