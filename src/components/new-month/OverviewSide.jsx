import { useContext } from 'react';
import { getLocaleCurrency } from '../../utils/currency';
import { Context } from '../../context/Context';

const OverviewSide = (props) => {
	const {
		newMonth,
		budget,
		toSavings,
		remaining,
		newExpenses,
		setNewExpenses,
		remainingBudget,
	} = props;

	const { currency } = useContext(Context);

	const totalFixedExpenses = newExpenses
		.map((e) => e.amount)
		.reduce((sum, item) => sum + item, 0);

	const deleteExpense = (name) => {
		setNewExpenses(newExpenses.filter((e) => e.name !== name));
	};

	const netBudget =
		budget -
		toSavings -
		totalFixedExpenses +
		(remaining === 'month' && remainingBudget);

	return (
		<div id='new-month-side-overview'>
			<h2 className='form-heading'>Overview</h2>
			<div className='overview-block'>
				<h4 className='overview-heading'>Month</h4>
				<p className='overview-p'>
					{new Date(newMonth).toLocaleDateString('en-GB', {
						month: 'long',
						year: 'numeric',
					})}
				</p>
			</div>
			<div className='overview-block'>
				<h4 className='overview-heading'>New Budget</h4>
				<p className='overview-p'>{getLocaleCurrency(budget, currency)}</p>
			</div>
			<div className='overview-block'>
				<h4 className='overview-heading'>To Savings</h4>
				<p className='overview-p'>{getLocaleCurrency(toSavings, currency)}</p>
			</div>
			<div className='overview-block'>
				<h4 className='overview-heading'>Remaining balance target</h4>
				<p className='overview-p'>
					{remaining.slice(0, 1).toUpperCase()}
					{remaining.slice(1)} ({getLocaleCurrency(remainingBudget, currency)})
				</p>
			</div>
			<div className='overview-block'>
				<h4 className='overview-heading'>Fixed Expenses</h4>
				{newExpenses.map((e) => (
					<div className='row expense-row' key={e.name}>
						<button
							type='button'
							className='delete-expense-button'
							onClick={() => deleteExpense(e.name)}
						>
							+
						</button>
						<p>{e.name}</p>
						<p>{getLocaleCurrency(e.amount, currency)}</p>
					</div>
				))}
				<div className='row'>
					<p>
						<b>Total</b>
					</p>
					<p>
						<b>{getLocaleCurrency(totalFixedExpenses, currency)}</b>
					</p>
				</div>
			</div>
			<div className='overview-block'>
				<h4 className='overview-heading'>Net Budget</h4>
				<p className='overview-p'>{getLocaleCurrency(netBudget, currency)}</p>
			</div>
		</div>
	);
};

export default OverviewSide;
