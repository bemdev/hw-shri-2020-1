import * as React from 'react';
import { connect } from 'react-redux';
import cn from '../../libs/names/index.js';

import Content from './__content/AppHeader__content.js';
import Logo from './__logo/AppHeader__logo.js';

import Button from '../AppButton/AppButton.js';

const blockName = cn('header')();

const Header = ({ title }) => {
	console.log(title);
	return (
		<header className={blockName}>
			<Content>
				{/* <Logo title={title} /> */}
				<Button size='l' hasIcon='cogs' text='Settings' />
			</Content>
		</header>
	);
};

const mapStateToProps = state => {
	return { title: state };
};

export default connect(mapStateToProps)(Header);
