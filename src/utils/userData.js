import budgetsService from '../services/budgets';
import categoriesService from '../services/categories';
import expensesService from '../services/expenses';
import savingsService from '../services/savings';
import transactionsService from '../services/transactions';

// Get the current month's transactions for the logged user
export const getCurrentTransactions = (user, transactions) => {
	return transactions.filter(
		(t) =>
			t.user.id === user.id &&
			t.record.month === user.record.month &&
			t.record.year === user.record.year
	);
};

export const getCurrentTransactionsSum = (userObject, transactionsArray) => {
	return getCurrentTransactions(userObject, transactionsArray);
};

export const setAllTokens = (token) => {
	transactionsService.setToken(token);
	savingsService.setToken(token);
	budgetsService.setToken(token);
	expensesService.setToken(token);
	categoriesService.setToken(token);
};

export const getCurrentExpensesObject = (userObject, expensesArray) => {
	return expensesArray.find(
		(e) =>
			e.record.month === userObject.record.month &&
			e.record.year === userObject.record.year
	);
};
export const getCurrentExpensesSum = (expensesArray) => {
	return expensesArray
		.map((e) => e.amount)
		.reduce((sum, item) => sum + item, 0);
};

export const getCurrentGrossBudget = (userObject, budgetsArray) => {
	return budgetsArray.find(
		(b) =>
			b.record.month === userObject.record.month &&
			b.record.year === userObject.record.year
	);
};

const userData = {
	getCurrentTransactions,
	getCurrentTransactionsSum,
	setAllTokens,
	getCurrentExpensesObject,
	getCurrentExpensesSum,
	getCurrentGrossBudget,
};

export default userData;
