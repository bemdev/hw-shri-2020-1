import * as React from 'react';
import cn from '../../../libs/names/index.js';

import './header__logo.css';
import '../__control/header__control.css';
import '../../text/_size/text_size_xxxl.css';

const Logo = ({ title, color }) => {
	const text = cn('text')({ size: 'xxxl' });
	const theme = cn('theme')({ color: `project-${color}` });
	const elemName = `${cn('header', 'logo')()} ${text} ${theme}`;

	return <div className={elemName}>{title}</div>;
};

export default Logo;
