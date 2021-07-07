import React from 'react';
import { useContext, useState } from 'react';
import { useField, useMonthField } from '../../hooks/hooks';
import { Context } from '../../context/Context';
import styled from 'styled-components';
import ExpenseRow from './ExpenseRow';

const Section = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
`;

const UserInitForm = () => {
	const { setUser } = useContext(Context);
	const [tempUser, setTempUser] = useState(null);
	const [fixed, setFixed] = useState([]);

	const year = new Date().getFullYear();

	// Current month
	const month = useMonthField();

	// Total savings (same model as additional ones)
	const totalSavings = useField('number');

	const budget = useField('number');

	// Fixed expenses
	const expenseName = useField('text');
	const expenseAmount = useField('number');

	const handleSubmitSavings = async (e) => {
		e.preventDefault();

		const newSavings = {
			amount: totalSavings.control.value,
			record: {
				month: month.control.value,
				year,
			},
		};

		setUser(tempUser);
	};

	const addFixed = (e) => {
		e.preventDefault();

		setFixed([
			...fixed,
			{ name: expenseName.control.value, amount: expenseAmount.control.value },
		]);
	};

	return (
		<Section>
			<div>
				<form id='savings-form'>
					<h2 className='form-heading'>Existing Savings</h2>
					<div className='form-row-full'>
						<label htmlFor='savings'>Savings</label>
						<input {...totalSavings.control} name='savings' id='savings' />
					</div>
					<input type='submit' value='Add' />
				</form>
				<form>
					<h2 className='form-heading'>Monthly Budget</h2>
					<div className='form-row-full'>
						<label htmlFor='budget'>Budget</label>
						<input {...budget.control} />
					</div>
					<input type='submit' value='Add' />
				</form>
				<form id='init-form' onSubmit={addFixed}>
					<h2 className='form-heading'>Fixed Expenses</h2>
					<div className='form-row'>
						<div>
							<label htmlFor='expense-name'>Fixed Expense Name</label>
							<input
								{...expenseName.control}
								name='expense-name'
								id='expense-name'
							/>
						</div>
						<div>
							<label htmlFor='expense-amount'>Fixed Expense Amount</label>
							<input
								{...expenseAmount.control}
								name='expense-amount'
								id='expense-amount'
							/>
						</div>
					</div>
					<input type='submit' value='Add Another' />
				</form>
			</div>
			<div id='init-info'>
				<div>
					<p>Savings</p>
					<h3>{totalSavings.control.value}</h3>
				</div>
				<div>
					<p>Fixed Expenses</p>
					{fixed.map((f) => (
						<ExpenseRow expense={f} />
					))}
				</div>
			</div>
		</Section>
	);
};

export default UserInitForm;
