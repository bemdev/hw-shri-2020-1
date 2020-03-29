const rootReducer = (state = [], action) => {
	switch (action.type) {
		case 'MODAL_TOGGLE':
			return {
				...state,
				modal: {
					active: action.payload.active,
					content: action.payload.content
				}
			};
		default:
			return state;
	}
};

export default rootReducer;
