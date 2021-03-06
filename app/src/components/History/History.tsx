import React from 'react';

import List from '../List/List';
import Card from '../Card/Card';

export interface HistoryProps {
    items: Build[] | any;
    view?: string;
}

const History: React.FC<HistoryProps> = ({ items, view }): any => {
    return items.length > 0 ? (
        <List items={items} />
    ) : (
        view === 'detail' && <Card view="full" item={items} />
    );
};

export default History;
