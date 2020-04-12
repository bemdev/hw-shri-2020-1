import * as React from 'react';
import Link from '../Link/Link.js';

import './menu.css';
import './__item/menu__item.css';

const Menu = ({ items }) => {
	return (
		<ul className='Menu'>
			{items && items.map((item, index) => {
				return (
					<li className='menu__item' key={index}>
						<Link href={item.href} title={item.title} />
					</li>
				);
			})}
		</ul>
	);
};

export default Menu;
