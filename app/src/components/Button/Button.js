import * as React from 'react';
import cn from '../../libs/names/index.js';

import './button.css';

import Icon from '../Icon/Icon.js';
import Text from '../Text/Text.js';

const Button = ({
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
		view: view ? view : null,
		width: width ? width : null,
		with: hasIcon ? 'icon' : null,
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
					disabled={disabled}
					onClick={onClick}
					className={`${blockName} ${theme} `}
				>
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
					className={`${blockName} ${theme} `}
				>
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
