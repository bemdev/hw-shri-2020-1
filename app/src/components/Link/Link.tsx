import * as React from 'react';

import './link.css';

export interface LinkProps {
	href: string;
	title: string;
}

const Link: React.FC<LinkProps> = ({ href, title }) => {
	return (
		<a href={href} className='Link'>
			{title}
		</a>
	);
};

export default Link;
