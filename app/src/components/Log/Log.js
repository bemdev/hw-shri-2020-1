import React from 'react';
import cn from '../../libs/names';
import Convert from 'ansi-to-html';

import './log.css';

const convert = new Convert({
	fg: '#000',
	newline: true,
	escapeXML: true,
});

const Log = ({ text }) => {
	return (
		<div
			className={cn('log')()}
			dangerouslySetInnerHTML={{ __html: convert.toHtml(text) }}
		></div>
	);
};

export default Log;
