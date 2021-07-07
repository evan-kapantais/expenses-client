import { useContext } from 'react';
import { getLocaleCurrency } from '../../utils/currency';
import { Context } from '../../context/Context';
import icons from '../../utils/icons';
import CloseButton from './CloseButton';

const Overview = (props) => {
	const {
		newMonth,
		budget,
		toSavings,
		remaining,
		newExpenses,
		setStep,
		remainingBudget,
		finaliseMonthCreation,
	} = props;

	const { currency } = useContext(Context);

	const totalFixedExpenses = newExpenses
		.map((e) => e.amount)
		.reduce((sum, item) => sum + item, 0);

	const netBudget =
		budget -
		toSavings -
		totalFixedExpenses +
		(remaining === 'month' && remainingBudget);

	return (
		<div id='new-month-overview'>
			<header>
				<h2 className=''>Overview</h2>
				<CloseButton color='light' />
			</header>
			<main>
				<div className='edit-block'>
					<button
						type='button'
						className='edit-block-button'
						onClick={() => setStep(0)}
					>
						<img src={icons.pencil} alt='edit icon' className='icon' />
					</button>
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
						<p className='overview-p'>
							{getLocaleCurrency(toSavings, currency)}
						</p>
					</div>
					<div className='overview-block'>
						<h4 className='overview-heading'>Remaining balance target</h4>
						<p className='overview-p'>
							{remaining.slice(0, 1).toUpperCase()}
							{remaining.slice(1)}
						</p>
					</div>
				</div>
				<div className='edit-block'>
					<button
						type='button'
						className='edit-block-button'
						onClick={() => setStep(1)}
					>
						<img src={icons.pencil} alt='edit icon' className='icon' />
					</button>
					<div className='overview-block'>
						<h4 className='overview-heading'>Fixed Expenses</h4>
						{newExpenses.map((e) => (
							<div key={e.name} className='row'>
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
				</div>
				<div className='overview-block' style={{ marginBottom: '1rem' }}>
					<h4 className='overview-heading'>Net Budget</h4>
					<p>{getLocaleCurrency(netBudget, currency)}</p>
				</div>
			</main>
			<footer>
				<button
					type='button'
					className='primary-button'
					onClick={finaliseMonthCreation}
				>
					Start Month
				</button>
			</footer>
		</div>
	);
};

export default Overview;
