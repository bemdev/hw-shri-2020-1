export const rootReducer = (state = [], action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export const dataReducer = (state = [], action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export const modalReduser = (state = [], action) => {
	switch (action.type) {
		case 'MODAL_TOGGLE':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
