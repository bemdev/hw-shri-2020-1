import * as React from 'react';
import cn from '../../libs/names/index.js';

import './text.css';

const Text = ({ content, size, type }) => {
	const blockName = cn('text')({ size: size, type: type });
	switch (type) {
		case 'p':
			return <p className={`${blockName}`}>{content}</p>;
		case 'h1':
			return <h1 className={`${blockName}`}>{content}</h1>;
		case 'h2':
			return <h2 className={`${blockName}`}>{content}</h2>;
		case 'h3':
			return <h3 className={`${blockName}`}>{content}</h3>;
		default:
			return <div className={`${blockName}`}>{content}</div>;
	}
};

export default Text;
