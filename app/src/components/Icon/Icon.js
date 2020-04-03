import * as React from 'react';
import cn from '../../libs/names/index.js';

import './icon.css';

const Icon = ({ fa, big }) => {
	const blockName = cn('icon')({ fa: fa, big: big });

	return <div className={`${blockName}`}></div>;
};

export default Icon;
