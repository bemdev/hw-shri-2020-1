import React, { useState, useEffect } from 'react';
import cn from '../../libs/names/index';

import Content from './__content/HeaderContent';
import Logo from './__logo/HeaderLogo';

import './header.css';

export interface HeaderProps {
	title: any;
	color: string;
	children?: any;
	href: string;
}

const blockName = cn('header')();

const Header:React.FC<HeaderProps> = ({ title, color, children, href }) => {
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
