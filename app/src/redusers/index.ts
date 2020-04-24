type ReducerAction = { type: string, payload?: {}};

export const rootReducer = (state = [], action:ReducerAction) => {
	switch (action.type) {
		default:
			return state;
	}
};

export const dataReducer = (state = [], action:ReducerAction) => {
	switch (action.type) {
		default:
			return state;
	}
};

export const modalReduser = (state = [], action:ReducerAction) => {
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
