import React, { useContext } from 'react';
import { Context } from '../context/Context';

const Expenses = () => {
	const { currency, transactions } = useContext(Context);

	const income = transactions
		?.filter((t) => t.amount > 0)
		.map((t) => t.amount)
		.reduce((sum, item) => sum + item, 0)
		.toLocaleString(navigator.location, {
			style: 'currency',
			currency: currency || 'USD',
			currencyDisplay: 'narrowSymbol',
		});

	return (
		<div id='block-income' className='block block-small block-with-label'>
			<p className='block-label'>Income</p>
			<h1 className='income'>{income}</h1>
		</div>
	);
};

export default Expenses;
