import React, { useState, useEffect } from 'react';
import cn from '../../libs/names/index.js';

import Content from './__content/HeaderContent.js';
import Logo from './__logo/HeaderLogo.js';

import './header.css';

const blockName = cn('header')();

const Header = ({ title, color, children, href }) => {
	return (
		<header className={blockName}>
			<Content>
				<a href={href}>
					<Logo title={title.repoName} color={color || 'inverse'} />
				</a>
				<div className={cn('header', 'control')()}>{children}</div>
			</Content>
		</header>
	);
};

export default Header;
