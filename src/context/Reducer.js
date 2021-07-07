const Reducer = (state, action) => {
	switch (action.type) {
		default:
			return { ...state };
		case 'SET_USER':
			return {
				...state,
				user: action.payload,
			};
		case 'SET_CURRENCY':
			return {
				...state,
				currency: action.payload,
			};
		case 'SET_NOTIF':
			return {
				...state,
				notif: {
					isError: action.payload.type,
					text: action.payload.string,
				},
			};
		case 'SET_THEME':
			return {
				...state,
				darkTheme: !state.darkTheme,
			};
		case 'SET_TRANSACTIONS':
			return {
				...state,
				transactions: action.payload,
			};
		case 'ADD_TRANSACTION':
			return {
				...state,
				transactions: [action.payload, ...state.transactions],
			};
		case 'DELETE_TRANSACTION':
			return {
				...state,
				transactions: [
					...state.transactions.filter((t) => t.id !== action.payload),
				],
			};
		case 'ADD_TO_SAVINGS':
			return {
				...state,
				savings: [action.payload, ...state.savings],
			};
		case 'ADD_TO_BUDGETS':
			return {
				...state,
				budgets: [action.payload, ...state.budgets],
			};
		case 'SET_BUDGETS':
			return {
				...state,
				budgets: action.payload,
			};
		case 'SET_SAVINGS':
			return {
				...state,
				savings: action.payload,
			};
		case 'SET_EXPENSES':
			return {
				...state,
				expenses: action.payload,
			};
		case 'SET_CATEGORIES':
			return {
				...state,
				categories: action.payload,
			};
		case 'ADD_TO_CATEGORIES':
			return {
				...state,
				categories: [action.payload, ...state.categories],
			};
		case 'RESET_DATA':
			return {
				...state,
				user: null,
				transactions: [],
				savings: [],
				budgets: [],
				expenses: [],
				categories: [],
			};
	}
};

export default Reducer;
