import { useContext } from 'react';
import { Context } from '../context/Context';

const Overview = () => {
	const { user, currency, savings } = useContext(Context);

	const monthlyAdditional = savings.find(
		(s) =>
			s.record.month === user.record.month && s.record.year === user.record.year
	)?.amount;

	const totalSavings = savings
		.map((s) => s.amount)
		.reduce((acc, item) => acc + item, 0);

	return (
		<div id='block-overview' className='block block-small block-with-label'>
			<p className='block-label'>Savings</p>
			<div>
				<span
					className='income'
					style={{
						display: 'block',
						fontSize: '0.85rem',
						marginBottom: '0.2rem',
					}}
				>
					+
					{currency &&
						monthlyAdditional?.toLocaleString(navigator.location, {
							style: 'currency',
							currency,
							currencyDisplay: 'narrowSymbol',
						})}
				</span>
				<h2>
					{currency &&
						totalSavings.toLocaleString(navigator.geolocation, {
							style: 'currency',
							currency: currency || 'USD',
							currencyDisplay: 'narrowSymbol',
						})}
				</h2>
			</div>
		</div>
	);
};

export default Overview;
