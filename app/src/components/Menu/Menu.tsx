import * as React from 'react';
import Link from '../Link/Link';

import './menu.css';
import './__item/menu__item.css';

export interface MenuProps {
    items: { href: string; title: string }[] | any;
}

const Menu: React.FC<MenuProps> = ({ items }) => {
    return (
        <ul className="Menu">
            {items &&
                items.map((item: any, index: number) => {
                    return (
                        <li className="menu__item" key={index}>
                            <Link href={item.href} title={item.title} />
                        </li>
                    );
                })}
        </ul>
    );
};

export default Menu;
