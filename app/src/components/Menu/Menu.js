import * as React from 'react';
import './Menu.css';

const Menu = ({items}) => {
    return (
        <ul className='Menu'>
            {items.map(item => {
                return (
                    <li className='menu__item'>
                        {item.title}
                    </li>
                )
            })}
        </ul>
    )
};

export default Menu;
