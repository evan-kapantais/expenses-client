import { useState, useContext } from 'react';
import { Context } from '../context/Context';
import { useHistory } from 'react-router-dom';
import usersService from '../services/users';
import budgetsService from '../services/budgets';
import savingsService from '../services/savings';
import expensesService from '../services/expenses';
import Expenses from './new-month/Expenses';
import Budget from './new-month/Budget';
import Overview from './new-month/Overview';
import OverviewSide from './new-month/OverviewSide';
import userData from '../utils/userData';

// TODO: notify user if fixed expenses + toSavings surpasses budget
// TODO: add remaining budget to savings / new month
// TODO: calculate the net budget here
// TODO: prevent new entries for same month
// TODO: prevent new month creation if already existing

const NewMonth = () => {
	const { user, setUser, transactions, budgets, expenses } = useContext(
		Context
	);

	const [step, setStep] = useState(0);
	const [newMonth, setnewMonth] = useState(
		`${user?.record.year}-${user?.record.month < 10 && '0'}${
			user?.record.month + 1
		}`
	);

	const [budget, setBudget] = useState(0);
	const [toSavings, setToSavings] = useState(0);
	const [remaining, setRemaining] = useState('savings');
	const [newExpenses, setNewExpenses] = useState([]);

	const history = useHistory();

	// (number) Starting budget of the running month
	const currentGrossBudget = budgets?.find(
		(b) =>
			b.record.month === user.record.month && b.record.year === user.record.year
	)?.amount;

	// (object) Fixed expenses of the running month
	const currentExpenses = expenses?.find(
		(e) =>
			e.record.month === user.record.month && e.record.year === user.record.year
	);

	// (number) Fixed expenses of the running month
	const currentExpensesSum = currentExpenses?.expenses
		.map((e) => e.amount)
		.reduce((sum, item) => sum + item, 0);

	// (number) Cumulative expenses / income of the running month
	const currentTransactions = transactions
		.map((t) => t.amount)
		.reduce((sum, item) => sum + item, 0);

	// (number) Balance left at the end of the month (starting balance + transactions - fixed expenses)
	const remainingBudget = Number(
		currentGrossBudget + currentTransactions - currentExpensesSum
	);

	const finaliseMonthCreation = async () => {
		updateUser()
			.then(() => storeBudget())
			.then(() => storeSavings())
			.then(() => storeExpenses())
			.then(() => history.push('/'));
	};

	const updateUser = async () => {
		const updatedUser = await usersService.updateUserMonth(user.id, {
			record: {
				month: newMonth.slice(5),
				year: newMonth.slice(0, 4),
			},
		});

		const newUserObject = {
			...user,
			record: updatedUser.record,
		};

		setUser(newUserObject);
		localStorage.setItem('expensesLoggedUser', JSON.stringify(newUserObject));
	};

	const storeBudget = async () => {
		const newExpensesSum = newExpenses
			.map((e) => e.amount)
			.reduce((sum, item) => sum + item, 0);

		let newNetBudget = {
			amount: budget - newExpensesSum - toSavings,
		};

		if (remaining === 'month') {
			newNetBudget.amount += remainingBudget;
		}

		await budgetsService.createOne(newNetBudget);
	};

	const storeSavings = async () => {
		const newSavings = { amount: toSavings };

		if (remaining === 'savings') {
			newSavings.amount += remainingBudget;
		}

		await savingsService.addOne(newSavings);
	};

	const storeExpenses = async () => {
		const newExpensesObject = {
			expenses: [...newExpenses],
		};

		await expensesService.addOne(newExpensesObject);
	};

	const budgetPanelProps = {
		newMonth,
		setnewMonth,
		budget,
		setBudget,
		toSavings,
		setToSavings,
		remaining,
		setRemaining,
		setStep,
	};

	const newMonthExpensesProps = {
		newExpenses,
		setNewExpenses,
		setStep,
	};

	const overviewSideProps = {
		newMonth,
		budget,
		toSavings,
		remaining,
		newExpenses,
		setNewExpenses,
		remainingBudget,
	};

	const overviewProps = {
		newMonth,
		budget,
		toSavings,
		remaining,
		newExpenses,
		setStep,
		remainingBudget,
		finaliseMonthCreation,
	};

	return (
		<div className='new-month-container block' id='new-month'>
			<div id='new-month'>
				{step === 0 && <Budget {...budgetPanelProps} />}
				{step === 1 && <Expenses {...newMonthExpensesProps} />}
				{step === 2 && <Overview {...overviewProps} />}
			</div>
			{step !== 2 && <OverviewSide {...overviewSideProps} />}
		</div>
	);
};

export default NewMonth;
