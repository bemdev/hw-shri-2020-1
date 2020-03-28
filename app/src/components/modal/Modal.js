import * as React from 'react';
import { connect } from 'react-redux';
import cn from '../../libs/names/index.js';

import './modal.css';

const Modal = ({ active, content }) => {
	const blockName = cn('modal')({ active: active });
	return (
		<div className={`${blockName}`}>
			<div className={cn('modal', 'content')()}>{content}</div>
		</div>
	);
};

const mapStateToProps = (state = []) => {
	return {
		content: state.modal && state.modal.content
	};
};

export default connect(mapStateToProps)(Modal);
