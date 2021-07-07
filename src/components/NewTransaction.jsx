import React, { useContext, useState } from 'react';
import { useField, useDateField } from '../hooks/hooks';
import { Context } from '../context/Context';
import Text from './inputs/Text';
import transactionsService from '../services/transactions';
import categoriesService from '../services/categories';
import userData, { getCurrentTransactions } from '../utils/userData';

const NewTransaction = ({ setNewTransaction }) => {
	const { user, setTransactions, addToCategories, categories } = useContext(
		Context
	);

	const [name, setName] = useState('');
	const [account, setAccount] = useState('');
	const [amount, setAmount] = useState('');

	const date = useDateField();
	const [type, setType] = useState('Card');
	const category = useField('text');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const transaction = {
			name,
			date: date.control.value,
			type,
			account,
			category: category.control.value,
			amount: Number(amount),
		};

		const newCategory = {
			name: category.control.value,
		};

		try {
			await transactionsService.addOne(transaction);
			const savedCategory = await categoriesService.createOne(newCategory);

			const transactions = await transactionsService.getAll();
			setTransactions(getCurrentTransactions(user, transactions));
			addToCategories(savedCategory);
		} catch (error) {
			console.error(error.message);
		}

		setNewTransaction(false);
	};

	const prefillForm = () => {
		setName('Gas');
		date.reset();
		setAmount(-45);
		setType('Card');
		setAccount('Sabadell');
		category.setValue('Transportation');
	};

	return (
		<form id='new-transaction-form' onSubmit={handleSubmit}>
			<header>
				<h2>New Transaction</h2>
				<button
					type='button'
					className='close-button'
					onClick={() => setNewTransaction(false)}
				>
					+
				</button>
				<button
					type='button'
					onClick={prefillForm}
					style={{ position: 'absolute', bottom: '0rem' }}
				>
					prefill
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
						<input {...category.control} list='categories' required />
						<datalist id='categories'>
							{categories.map((c) => (
								<option key={c.name} value={c.name}>
									{c.name}
								</option>
							))}
						</datalist>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input {...date.control} required />
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
					<input type='submit' value='Save & Close' />
				</div>
			</footer>
		</form>
	);
};

export default NewTransaction;
