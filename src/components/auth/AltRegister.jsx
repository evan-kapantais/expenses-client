import { useEffect, useState, useContext } from 'react';
import { useField, useMonthField } from '../../hooks/hooks';
import { months } from '../../utils/dates';
import { getLocaleCurrency } from '../../utils/currency';
import { Context } from '../../context/Context';
import Text from '../inputs/Text';
import Number from '../inputs/Number';
import Password from '../inputs/Password';
import User from './register/User';

import loginService from '../../services/login';
import transactionsService from '../../services/transactions';
import savingsService from '../../services/savings';
import budgetsService from '../../services/budgets';
import expensesService from '../../services/expenses';

const AltRegister = () => {
	const {
		setNotif,
		setUser,
		addToSavings,
		addToBudgets,
		setExpenses,
	} = useContext(Context);

	const [step, setStep] = useState(0);

	const [currencies, setCurrencies] = useState([]);

	useEffect(() => {
		fetch('https://openexchangerates.org/api/currencies.json')
			.then((res) => res.json())
			.then((data) => {
				const array = [];

				for (const [key, value] of Object.entries(data)) {
					const item = { symbol: key, name: value };
					array.push(item);
					setCurrencies(array);
				}
			});
	}, []);

	const username = useField('text');
	const name = useField('text');
	const password = useField('password');
	const repeatPassword = useField('password');

	const month = useMonthField();

	const [currency, setCurrency] = useState('');

	const totalSavings = useField('number');

	const budget = useField('number');
	const toSavings = useField('number');

	const expenseName = useField('text');
	const expenseAmount = useField('number');

	const [stateUsername, setstateUsername] = useState('');
	const [stateName, setstateName] = useState('');
	const [statePassword, setStatePassword] = useState('');
	const [stateRepeatPassword, setStateRepeatPassword] = useState('');
	const [stateMonth, setStateMonth] = useState();
	const [stateCurrency, setStateCurrency] = useState('');
	const [stateSavings, setStateSavings] = useState(0);
	const [stateBudget, setStateBudget] = useState(0);
	const [stateToSavings, setStateToSavings] = useState(0);
	const [stateFixed, setStateFixed] = useState([]);

	const storeSavings = () => {
		const newSavings = {
			amount: Number(stateSavings + stateToSavings),
			record: {
				month: Number(stateMonth.slice(5)),
				year: Number(stateMonth.slice(0, 4)),
			},
		};

		savingsService.addOne(newSavings).then((res) => {
			addToSavings(res);
			storeBudget();
		});
	};

	const storeBudget = () => {
		console.log(typeof budget.control.value);

		const newBudget = {
			amount: budget.control.value,
			record: {
				month: Number(stateMonth.slice(5)),
				year: Number(stateMonth.slice(0, 4)),
			},
		};

		budgetsService.createOne(newBudget).then((res) => {
			addToBudgets(res);
			storeExpenses();
		});
	};

	const storeExpenses = () => {
		const expenses = {
			expenses: stateFixed,
			record: {
				month: Number(stateMonth.slice(5)),
				year: Number(stateMonth.slice(0, 4)),
			},
		};

		expensesService.addOne(expenses).then((res) => setExpenses(res));
	};

	const storeUser = () => {
		const newUser = {
			username: stateUsername,
			name: stateName,
			password: statePassword,
			currency,
			record: {
				month: Number(stateMonth.slice(5)),
				year: Number(stateMonth.slice(0, 4)),
			},
		};

		loginService.register(newUser).then((res) => {
			setUser(res);

			window.localStorage.setItem('expensesLoggedUser', JSON.stringify(res));

			transactionsService.setToken(res.token);
			savingsService.setToken(res.token);
			budgetsService.setToken(res.token);
			expensesService.setToken(res.token);

			storeSavings();
		});
	};

	const handleSetMonth = (e) => {
		e.preventDefault();

		const valid = currencies.find((c) => c.symbol === currency);

		if (!valid) {
			return setNotif(true, 'Please select a valid currency');
		}

		setStateMonth(month.control.value);
		setStateCurrency(currency);
		setStep(2);
	};

	const formatMonth = () => {
		return `${months[stateMonth.slice(5) - 1]}, ${stateMonth.slice(0, 4)}`;
	};

	const handleAddSavings = (e) => {
		e.preventDefault();

		setStateSavings(totalSavings.control.value);
		setStep(3);
	};

	const handleSetBudget = (e) => {
		e.preventDefault();

		setStateBudget(budget.control.value);
		setStateToSavings(toSavings.control.value);
		setStep(4);
	};

	const handleAddFixed = (e) => {
		e.preventDefault();

		setStateFixed([
			...stateFixed,
			{
				name: expenseName.control.value,
				amount: Number(expenseAmount.control.value),
			},
		]);

		expenseName.setValue('');
		expenseAmount.setValue(0);
	};

	const handleShowOverview = (e) => {
		e.preventDefault();

		if (expenseAmount > 0 && expenseName !== '') {
			setStateFixed([
				...stateFixed,
				{
					name: expenseName.control.value,
					amount: Number(expenseAmount.control.value),
				},
			]);
		}

		const container = document.getElementById('alt-register');
		container.style.display = 'flex';
		container.style.justifyContent = 'center';
		container.style.alignItems = 'center';
		setStep(5);
	};

	const getNetBudget = () => {
		const totalFixed = stateFixed
			.map((f) => f.amount)
			.reduce((sum, item) => (sum += item), 0);

		return stateBudget - stateToSavings - totalFixed;
	};

	const prefill = {
		user: () => {
			username.setValue('root');
			name.setValue('Root');
			password.setValue('root');
			repeatPassword.setValue('root');
		},
		savings: () => {
			totalSavings.setValue(12000);
		},
		budget: () => {
			budget.setValue(2200);
			toSavings.setValue(350);
		},
		fixed: () => {
			expenseName.setValue('Rent');
			expenseAmount.setValue(825);
		},
		all: () => {
			prefill.user();
			prefill.savings();
			prefill.budget();
			prefill.fixed();
		},
	};

	// TODO: make all inputs required (front & back)
	return (
		<div id='alt-register'>
			<button
				type='button'
				style={{ position: 'absolute', top: '-2rem' }}
				onClick={prefill.all}
			>
				Prefill All
			</button>
			{step !== 5 && (
				<div id='register-left'>
					<div className='block block-tiny block-with-label'>
						<span className='block-label'>Month</span>
						<p>
							<b>{stateMonth && formatMonth()}</b>
						</p>
					</div>
					<div className='block block-small block-with-label'>
						<span className='block-label'>User</span>
						<div>
							<p>{stateName}</p>
							<p>
								{stateUsername && '@'}
								{stateUsername}
							</p>
						</div>
					</div>
					<div className='block block-tiny block-with-label'>
						<span className='block-label'>Savings</span>
						<p>
							{stateCurrency &&
								getLocaleCurrency(stateSavings + stateToSavings, stateCurrency)}
						</p>
					</div>
				</div>
			)}
			<div id='register-main' className='block'>
				{step === 0 && (
					<User
						setstateName={setstateName}
						setstateUsername={setstateUsername}
						setStatePassword={setStatePassword}
						setStateRepeatPassword={setStateRepeatPassword}
						setStep={setStep}
					/>
				)}
				{step === 1 && (
					<form onSubmit={handleSetMonth}>
						<label htmlFor='month'>Starting Month</label>
						<input {...month.control} />
						<label htmlFor='currency'>Currency</label>
						<input
							list='currency'
							type='text'
							name='currency'
							value={currency}
							onChange={(e) => setCurrency(e.target.value)}
						/>
						<datalist id='currency'>
							{currencies.map((c) => (
								<option key={c.symbol} value={c.symbol}>
									{c.name}
								</option>
							))}
						</datalist>
						<input type='submit' value='Set Month' />
					</form>
				)}
				{step === 2 && (
					<form onSubmit={handleAddSavings}>
						<label htmlFor='total-savings'>Total Savings</label>
						<input {...totalSavings.control} />
						<input type='submit' value='Add Savings' />
						<button type='button' onClick={prefill.savings}>
							prefill
						</button>
					</form>
				)}
				{step === 3 && (
					<form onSubmit={handleSetBudget}>
						<label htmlFor='budget'>Monthly Budget</label>
						<input {...budget.control} />
						<label htmlFor='to-savings'>To Savings</label>
						<input {...toSavings.control} min={0} max={budget.control.value} />
						<input type='submit' value='Set Budget' />
						<button type='button' onClick={prefill.budget}>
							prefill
						</button>
					</form>
				)}
				{step === 4 && (
					<form onSubmit={handleShowOverview}>
						<label htmlFor='expense-name'>Expense Name</label>
						<input {...expenseName.control} />
						<label htmlFor='expense-amount'>Expense Amount</label>
						<input {...expenseAmount.control} />
						<button type='button' onClick={handleAddFixed}>
							Add Another
						</button>
						<button type='button' onClick={prefill.fixed}>
							prefill
						</button>
						<input type='submit' value='Finish' />
					</form>
				)}
				{step === 5 && (
					<div id='register-summary'>
						<h2>Your Summary</h2>
						<section>
							<h4>User</h4>
							<p>{stateMonth}</p>
							<p>@{stateUsername}</p>
							<p>{stateName}</p>
						</section>
						<section>
							<h4>Total Savings</h4>
							<p>{stateSavings + stateToSavings} €</p>
							<p>{stateToSavings} € added</p>
						</section>
						<section>
							<h4>This Month's Budget</h4>
							<p>{getNetBudget()} €</p>
						</section>
						<section>
							<h4>Fixed Expenses</h4>
							<p>
								{stateFixed
									.map((f) => f.amount)
									.reduce((sum, item) => (sum += item), 0)}{' '}
								€
							</p>
						</section>
						<button type='button' onClick={storeUser}>
							Create User
						</button>
					</div>
				)}
			</div>
			{step !== 5 && (
				<div id='register-right'>
					<div className='block block-tiny block-with-label'>
						<span className='block-label'>Gross Budget</span>
						<p>
							{stateCurrency && getLocaleCurrency(stateBudget, stateCurrency)}
						</p>
					</div>
					<div className='block block-tiny block-with-label'>
						<span className='block-label'>Net Budget</span>
						<p>
							{stateCurrency &&
								getLocaleCurrency(getNetBudget(), stateCurrency)}
						</p>
					</div>
					<div className='block block-medium block-with-label'>
						<span className='block-label'>Fixed Expenses</span>
						<div>
							{stateFixed.map((fixed) => (
								<div
									key={fixed.name}
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: '0.5rem',
									}}
								>
									<p>{fixed.name}</p>
									<p>{getLocaleCurrency(fixed.amount, stateCurrency)}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AltRegister;
