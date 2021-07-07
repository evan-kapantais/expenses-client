import { useContext } from 'react';
import { Context } from '../../context/Context';
import CloseButton from './CloseButton';

const Budget = (props) => {
	const {
		newMonth,
		setnewMonth,
		budget,
		setBudget,
		toSavings,
		setToSavings,
		remaining,
		setRemaining,
		setStep,
	} = props;

	const { setNotif } = useContext(Context);

	const submitBudget = (e) => {
		e.preventDefault();

		if (budget <= 0) {
			return setNotif(true, 'Please enter a positive budget amount');
		}

		if (toSavings > budget) {
			return setNotif(
				true,
				'Amount to savings cannot be larger than your budget'
			);
		}

		if (budget === toSavings) {
			return setNotif(true, 'Your budget will be 0 after adding to savings.');
		}

		setStep(1);
	};

	return (
		<form
			onSubmit={submitBudget}
			id='new-month-budget'
			className='new-month-form'
		>
			<header>
				<h2>New Month Setup</h2>
				<CloseButton color='dark' />
			</header>
			<main>
				<section>
					<h4 className='form-heading'>New budget</h4>
					<div className='form-row-full'>
						<label htmlFor='month'>Month</label>
						<input
							type='month'
							value={newMonth}
							onChange={(e) => setnewMonth(e.target.value)}
							required
						/>
					</div>
					<div className='form-row'>
						<div>
							<label htmlFor='new-budget'>Budget</label>
							<input
								type='number'
								value={budget}
								onChange={(e) => setBudget(Number(e.target.value))}
								required
							/>
						</div>
						<div>
							<label htmlFor='to-savings'>Budget → Savings</label>
							<input
								type='number'
								value={toSavings}
								onChange={(e) => setToSavings(Number(e.target.value))}
								required
							/>
						</div>
					</div>
					<div className='form-row-full'>
						<label htmlFor='remaining'>Transfer remaining balance to</label>
						<select
							name='remaining'
							id='remaining'
							value={remaining}
							onChange={(e) => setRemaining(e.target.value)}
							required
						>
							<option value='savings'>Savings</option>
							<option value='month'>Next Month</option>
						</select>
					</div>
				</section>
			</main>
			<footer>
				<input type='submit' value='Next 👉' />
			</footer>
		</form>
	);
};

export default Budget;
