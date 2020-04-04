import React, { useState, useEffect } from 'react';
import cn from '../../libs/names/index.js';

import Content from './__content/HeaderContent.js';
import Logo from './__logo/HeaderLogo.js';

const blockName = cn('header')();

const Header = ({ title, color, children }) => {
	return (
		<header className={blockName}>
			<Content>
				<Logo title={title.repoName} color={color || 'inverse'} />
				<div className={cn('header', 'control')()}>{children}</div>
			</Content>
		</header>
	);
};

export default Header;
