import React from 'react';
import cn from '../../libs/names';

import './input.css';

const Input = (props) => {
	return (
		<div
			className={cn('input')({
				with: props.with,
				width: props.width,
				required: props.required,
				has: props.has,
			})}
		>
			{props.with === 'add-ons' ? (
				<>
					<div className={cn('input', 'addon')()}>Synchronize</div>
					<input
						onChange={props.onChange}
						name={props.name}
						value={props.value}
						placeholder={props.placeholder}
						className={cn(
							'input',
							'control'
						)({
							width: props.width,
							required: props.required,
						})}
					/>
					<div className={cn('input', 'addon')()}>minutes</div>
				</>
			) : (
				<>
					<div className={cn('input', 'label')()}>{props.label}</div>
					<input
						onChange={props.onChange}
						name={props.name}
						value={props.value}
						placeholder={props.placeholder}
						className={cn(
							'input',
							'control'
						)({
							width: props.width,
							required: props.required,
						})}
					/>
				</>
			)}
			{props.has === 'close' ? (
				<div className={cn('input', 'close')()}></div>
			) : null}
		</div>
	);
};

export default Input;
