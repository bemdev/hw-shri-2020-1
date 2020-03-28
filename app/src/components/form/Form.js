import React from 'react';
import cn from '../../libs/names/index.js';

import Button from '../AppButton/AppButton.js';
import Input from '../input/Input.js';

import './form.css';

const Form = ({ items, type }) => {
	switch (type) {
		case 'build':
			return (
				<form className={cn('form')({ type: type })}>
					<Input
						placeholder='8a66797'
						label='Enter commit hash'
						name='hash'
						width='full'
						required={true}
					/>
					<Button size='xl' view='active' text='Start build' />
					<Button size='xl' text='Cancel build' />
				</form>
			);

		default:
			return (
				<form className={cn('form')()}>
					<Input
						placeholder='bemdev/aef'
						label='GitHub repository'
						name='repoName'
						width='full'
						required={true}
					/>
					<Input
						value='yarn start'
						label='Build command'
						name='buildCommand'
						width='full'
						has={'close'}
					/>
					<Input
						name='mainBranch'
						value='main'
						label='Main branch'
						width='full'
						has={'close'}
					/>
					<Input name='period' value={10} with={'add-ons'} />
					<Button size='xl' view='active' text='Save settings' />
					<Button size='xl' text='Cancel settings' />
				</form>
			);
	}
};

export default Form;
