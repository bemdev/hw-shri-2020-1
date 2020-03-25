import * as React from 'react';
import cn from '../../libs/names/index.js';

import './text.css';

const Text = ({ content, size, type }) => {
	const blockName = cn('text')({ size: size, type: type });
	switch (type) {
		case 'p':
			return <p className={`${blockName}`}>{content}</p>;

		default:
			return <div className={`${blockName}`}>{content}</div>;
	}
};

export default Text;
