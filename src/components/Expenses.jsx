import React, { useContext } from 'react';
import { Context } from '../context/Context';

const Expenses = () => {
	const { currency, transactions } = useContext(Context);

	const expenses = transactions
		?.filter((t) => t.amount < 0)
		.map((t) => t.amount)
		.reduce((sum, item) => (sum += item), 0)
		.toLocaleString(navigator.location, {
			style: 'currency',
			currency: currency || 'USD',
			currencyDisplay: 'narrowSymbol',
		});

	return (
		<div id='block-expenses' className='block block-small block-with-label'>
			<p className='block-label'>Expenses</p>
			<h1 className='expense'>{expenses}</h1>
		</div>
	);
};

export default Expenses;
