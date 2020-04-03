import * as React from 'react';
import { connect } from 'react-redux';
import cn from '../../libs/names/index.js';

import './modal.css';

const Modal = ({ active, content, closeModal }) => {
	const blockName = cn('modal')({ active: active });

	const handleClick = (e) => {
		if (e.target.classList[0] === 'modal') {
			closeModal();
		}
	};

	return (
		<div onClick={handleClick} className={`${blockName}`}>
			<div className={cn('modal', 'content')()}>{content}</div>
		</div>
	);
};

const mapStateToProps = (state = []) => {
	return {
		content: state.modal && state.modal.content,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () =>
			dispatch({
				type: 'MODAL_TOGGLE',
				payload: {
					active: false,
				},
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
