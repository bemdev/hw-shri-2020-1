import React, { useState, useEffect } from 'react';
// import cn from '../../libs/names/index.js';

import List from '../list/List.js';
import Card from '../card/Card.js';

const History = ({ items, view }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        items.then(result => {
            setCards(result.data);
        });
    }, [items]);

    return (
        cards && cards.length > 0 ?
            <List items={cards} />
        : view === 'detail' && <Card view='full' item={cards}/>
    )
};

export default History;
