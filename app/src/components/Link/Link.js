import * as React from 'react';

import './link.css';

const Link = ({ href, title }) => {
	return (
		<a href={href} className='Link'>
			{title}
		</a>
	);
};

export default Link;
