import { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import CloseButton from './CloseButton';

const Expenses = (props) => {
	const { newExpenses, setNewExpenses, setStep } = props;
	const { setNotif, expenses, user } = useContext(Context);

	const [name, setName] = useState('');
	const [amount, setAmount] = useState(0);

	const fillPastExpenses = () => {
		const currentExpenses = expenses.find(
			(e) =>
				e.record.month === user.record.month &&
				e.record.year === user.record.year
		);

		setNewExpenses([...currentExpenses.expenses]);
	};

	const submitExpense = (e) => {
		e.preventDefault();

		const existingExpense = newExpenses.find(
			(e) => e.name.toLowerCase() === name.toLowerCase()
		);

		if (existingExpense) {
			setName('');
			setAmount(0);
			return setNotif(true, 'Expense already exists');
		}

		if (amount <= 0) {
			return setNotif(true, 'Please enter a positive amount');
		}

		const newExpense = {
			name: name.slice(0, 1).toUpperCase() + name.slice(1),
			amount: Number(amount),
		};

		setNewExpenses([newExpense, ...newExpenses]);

		setName('');
		setAmount(0);
	};

	return (
		<form className='new-month-form' onSubmit={submitExpense}>
			<header>
				<h2>Set up fixed expenses</h2>
				<CloseButton color='dark' />
			</header>
			<main>
				<section>
					<h4>Add Expense</h4>
					<button
						type='button'
						className='text-button'
						style={{ marginBottom: '2rem' }}
						onClick={fillPastExpenses}
					>
						Copy previous month's expenses
					</button>
					<div className='form-row'>
						<div>
							<label htmlFor='name'>Name *</label>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor='amount'>Amount *</label>
							<input
								type='number'
								min='0'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>
						</div>
					</div>
					<button type='submit' className='text-button'>
						Add Expense
					</button>
				</section>
			</main>
			<footer style={{ display: 'flex' }}>
				<button
					type='button'
					className='primary-button primary-button-back'
					style={{ marginRight: '2rem' }}
					onClick={() => setStep(0)}
				>
					👈 Back
				</button>
				<button
					type='button'
					className='primary-button'
					onClick={() => setStep(2)}
				>
					Overview 👉
				</button>
			</footer>
		</form>
	);
};

export default Expenses;
