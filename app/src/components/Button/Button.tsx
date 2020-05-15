import * as React from 'react';
import cn from '../../libs/names/index';

import './button.css';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    size?: string;
    hasIcon?: string;
    text?: string;
    view?: string;
    width?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler;
    variant?: string;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    type,
    size,
    hasIcon,
    text,
    view,
    width,
    disabled,
    onClick,
    variant,
    href,
}) => {
    const blockName = cn('button')({
        size: size,
        view: view,
        width: width,
        hasIcon: hasIcon,
        variant: variant,
    });
    const elemName = cn('button', 'text')();
    const theme = cn('theme')({ color: 'project-default' });

    switch (variant) {
        case 'link':
            return (
                <a
                    href={href}
                    type={type}
                    // disabled={disabled}
                    onClick={onClick}
                    className={`${blockName} ${theme} `}>
                    {hasIcon && <Icon fa={hasIcon} />}
                    {text}
                </a>
            );
        default:
            return (
                <button
                    type={type}
                    disabled={disabled}
                    onClick={onClick}
                    className={`${blockName} ${theme} `}>
                    {hasIcon ? <Icon fa={hasIcon} /> : null}
                    {text ? (
                        <div className={elemName}>
                            <Text content={text} />
                        </div>
                    ) : null}
                </button>
            );
    }
};

export default Button;
