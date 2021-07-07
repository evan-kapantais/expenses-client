import React, { useContext } from 'react';
import { Context } from '../context/Context';
import transactionsService from '../services/transactions';
import icons from '../utils/icons';

const Transaction = (props) => {
	const { transaction, setEditPanel, setEditTransaction } = props;
	const { name, type, category, amount, date } = transaction;
	const { currency, darkTheme, deleteTransaction } = useContext(Context);

	const getIcon = () => {
		switch (type) {
			case 'Cash':
				return '💵';
			case 'Fees':
				return '🏦';
			case 'Card':
			default:
				return '💳 ';
		}
	};

	const formattedDate = new Date(date).toLocaleDateString();

	const openEditPanel = () => {
		setEditPanel(true);
		setEditTransaction(transaction);
	};

	const handleDelete = async () => {
		try {
			await transactionsService.deleteOne(transaction.id);
			deleteTransaction(transaction.id);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<li className={`transaction ${category.toLowerCase()}`}>
			<div>
				<div>
					<span role='img' aria-label='img'>
						{getIcon()}
					</span>
				</div>
				<div>
					<p className='transaction-name'>{name}</p>
					<p className='transaction-date'>
						<span>{formattedDate}</span> |{' '}
						<span className={category.toLowerCase()}>{category}</span>
					</p>
				</div>
			</div>
			<div className={amount > 0 ? 'income' : 'expense'}>
				{amount.toLocaleString(navigator.location, {
					style: 'currency',
					currency: currency,
				})}
			</div>
			<div className='transaction-overlay'>
				<div>
					<button type='button' onClick={openEditPanel}>
						<img
							src={darkTheme ? icons.pencil : icons.pencilWhite}
							alt='pencil icon'
							className='icon'
						/>
					</button>
					<button type='button' onClick={handleDelete}>
						<img
							src={darkTheme ? icons.trash : icons.trashWhite}
							alt='trash can icon'
							className='icon'
						/>
					</button>
				</div>
			</div>
		</li>
	);
};

export default Transaction;
