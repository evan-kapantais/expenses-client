import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import Text from './inputs/Text';
import transactionsService from '../services/transactions';
import categoriesService from '../services/categories';

const EditTransaction = (props) => {
	const { setEditPanel, editTransaction } = props;
	const {
		addTransaction,
		setTransactions,
		addToCategories,
		categories,
	} = useContext(Context);

	const [name, setName] = useState(editTransaction.name);
	const [account, setAccount] = useState(editTransaction.account);
	const [amount, setAmount] = useState(editTransaction.amount);
	const [date, setDate] = useState(editTransaction.date.slice(0, 10));
	const [type, setType] = useState(editTransaction.type);
	const [category, setCategory] = useState(editTransaction.category);

	const updateTransaction = async (e) => {
		e.preventDefault();

		const transaction = {
			name,
			date,
			type,
			account,
			category,
			amount: Number(amount),
		};

		const newCategory = {
			name: category,
		};

		try {
			await transactionsService.updateOne(editTransaction.id, transaction);
			const savedCategory = await categoriesService.createOne(newCategory);

			const transactions = await transactionsService.getAll();

			setTransactions(transactions);
			addToCategories(savedCategory);
			setEditPanel(false);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<form id='new-transaction-form' onSubmit={updateTransaction}>
			<header>
				<div>
					<h2 style={{ marginBottom: '0.2rem' }}>Edit Transaction</h2>
					<p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'grey' }}>
						{editTransaction.id}
					</p>
				</div>
				<button
					type='button'
					className='close-button'
					onClick={() => setEditPanel(false)}
				>
					+
				</button>
			</header>
			<main>
				<div className='form-row-full'>
					<Text
						type='text'
						text='Name'
						value={name}
						setValue={setName}
						required={true}
					/>
				</div>
				<div className='form-row'>
					<div>
						<label htmlFor='type'>Type *</label>
						<select
							name='type'
							id='type'
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option value='Card'>Card</option>
							<option value='Cash'>Cash</option>
							<option value='Transfer'>Transfer</option>
							<option value='Online'>Online</option>
						</select>
					</div>
					<div>
						<Text
							type='text'
							text='Account'
							value={account}
							setValue={setAccount}
						/>
					</div>
				</div>
				<div className='form-row'>
					<div>
						<label htmlFor='category'>Category</label>
						<input
							type='text'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							list='categories'
							required
						/>
						<datalist id='categories'>
							{categories.map((c) => (
								<option key={c.id} value={c.name}>
									{c.name}
								</option>
							))}
						</datalist>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className='form-row-full'>
					<div>
						<Text
							type='number'
							text='Amount'
							value={amount}
							setValue={setAmount}
							required={true}
						/>
					</div>
				</div>
			</main>
			<footer>
				<div className='form-buttons-container'>
					<input type='submit' value='Update' />
				</div>
			</footer>
		</form>
	);
};

export default EditTransaction;
