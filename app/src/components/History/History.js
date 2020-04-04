import React from 'react';

import List from '../List/List.js';
import Card from '../Card/Card.js';

const History = ({ items, view }) => {
	return items && items.length > 0 ? (
		<List items={items} />
	) : (
		view === 'detail' && <Card view='full' item={items} />
	);
};

export default History;
