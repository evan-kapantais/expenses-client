import { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const initialState = {
	user: null,
	currency: null,
	transactions: null,
	savings: [],
	budgets: [],
	expenses: [],
	categories: [],
	darkTheme: false,
	notif: { isError: true, text: '' },
};

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);

	const setUser = (object) => {
		dispatch({
			type: 'SET_USER',
			payload: object,
		});
	};

	const setCurrency = (string) => {
		dispatch({
			type: 'SET_CURRENCY',
			payload: string,
		});
	};

	const setNotif = (type, string) => {
		dispatch({
			type: 'SET_NOTIF',
			payload: { type, string },
		});

		setTimeout(() => {
			dispatch({
				type: 'SET_NOTIF',
				payload: { isError: false, text: '' },
			});
		}, 5000);
	};

	const toggleTheme = () => {
		dispatch({
			type: 'SET_THEME',
		});
	};

	const setTransactions = (array) => {
		dispatch({
			type: 'SET_TRANSACTIONS',
			payload: array,
		});
	};

	const addTransaction = (object) => {
		dispatch({
			type: 'ADD_TRANSACTION',
			payload: object,
		});
	};

	const deleteTransaction = (id) => {
		dispatch({
			type: 'DELETE_TRANSACTION',
			payload: id,
		});
	};

	const addToSavings = (object) => {
		dispatch({
			type: 'ADD_TO_SAVINGS',
			payload: object,
		});
	};

	const setSavings = (number) => {
		dispatch({
			type: 'SET_SAVINGS',
			payload: number,
		});
	};

	const setBudgets = (number) => {
		dispatch({
			type: 'SET_BUDGETS',
			payload: number,
		});
	};

	const addToBudgets = (object) => {
		dispatch({
			type: 'ADD_TO_BUDGETS',
			payload: object,
		});
	};

	const setExpenses = (array) => {
		dispatch({
			type: 'SET_EXPENSES',
			payload: array,
		});
	};

	const setCategories = (array) => {
		dispatch({
			type: 'SET_CATEGORIES',
			payload: array,
		});
	};

	const addToCategories = (object) => {
		dispatch({
			type: 'ADD_TO_CATEGORIES',
			payload: object,
		});
	};

	const resetData = () => {
		dispatch({
			type: 'RESET_DATA',
		});
	};

	return (
		<Context.Provider
			value={{
				user: state.user,
				currency: state.currency,
				transactions: state.transactions,
				savings: state.savings,
				budgets: state.budgets,
				expenses: state.expenses,
				darkTheme: state.darkTheme,
				notif: state.notif,
				categories: state.categories,
				setUser,
				setCurrency,
				toggleTheme,
				setNotif,
				setTransactions,
				addTransaction,
				deleteTransaction,
				addToSavings,
				setSavings,
				addToBudgets,
				setBudgets,
				setExpenses,
				setCategories,
				addToCategories,
				resetData,
			}}
		>
			{children}
		</Context.Provider>
	);
};
