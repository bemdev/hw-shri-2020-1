import * as React from 'react';
import cn from '../../libs/names/index.js';

import Card from '../card/Card.js';

import './list.css';

const List = ({ items, children }) => {
	return (
		<div className={cn('list')()}>
			{items.map((item, index) => {
				return <Card item={item} key={index} />;
			})}
		</div>
	);
};

export default List;
