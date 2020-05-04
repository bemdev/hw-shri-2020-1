import * as React from 'react';
import cn from '../../libs/names/index';

import Card from '../Card/Card';

import './list.css';

export interface ListProps {
    items: Build[];
}

const List: React.FC<ListProps> = ({ items, children }) => {
    return (
        <div className={cn('list')()}>
            {items &&
                items.map((item, index) => {
                    return <Card item={item} key={index} />;
                })}
        </div>
    );
};

export default List;
