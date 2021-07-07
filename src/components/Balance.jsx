import { useContext } from 'react';
import { Context } from '../context/Context';

const Balance = () => {
	const { user, currency, expenses, transactions, budgets } = useContext(
		Context
	);

	const grossBudget = budgets?.find(
		(b) =>
			b.record.month === user.record.month && b.record.year === user.record.year
	)?.amount;

	const transactionsSum = transactions
		?.map((t) => t.amount)
		.reduce((acc, item) => acc + item, 0);

	const currentFixedExpenses = expenses?.find(
		(e) =>
			e.record.month === user.record.month && e.record.year === user.record.year
	);

	const totalFixedExpenses = currentFixedExpenses?.expenses
		.map((e) => e.amount)
		.reduce((acc, item) => acc + item, 0);

	const balance = (
		grossBudget + transactionsSum - totalFixedExpenses || 0
	)?.toLocaleString(navigator.location, {
		style: 'currency',
		currency: currency || 'USD',
		currencyDisplay: 'narrowSymbol',
	});

	return (
		<div className='block block-small block-with-label' id='block-balance'>
			<p className='block-label'>Monthly Balance</p>
			<div>
				<span
					className={transactionsSum > 0 ? 'income' : 'expense'}
					style={{
						display: 'block',
						fontSize: '0.85rem',
						marginBottom: '0.2rem',
					}}
				>
					{transactionsSum > 0 && '+'}
					{currency &&
						transactionsSum !== 0 &&
						transactionsSum?.toLocaleString(navigator.location, {
							style: 'currency',
							currency,
						})}
				</span>
				<h1>{balance}</h1>
			</div>
		</div>
	);
};

export default Balance;
