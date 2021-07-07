import { useContext } from 'react';
import { Context } from '../context/Context';

const Fixed = () => {
	const { user, currency, expenses } = useContext(Context);

	const currentExpenses = expenses?.find(
		(e) =>
			e.record.month === user.record.month && e.record.year === user.record.year
	);

	return (
		<div id='block-fixed' className='block block-medium block-with-label'>
			<p className='block-label'>Fixed Expenses</p>
			<div style={{ width: '100%' }}>
				{currentExpenses?.expenses?.map((e) => (
					<div key={e.name} className='overview-row'>
						<p>{e.name}</p>
						<p>
							<b>
								{e.amount.toLocaleString(navigator.location, {
									style: 'currency',
									currency: currency || 'USD',
									currencyDisplay: 'narrowSymbol',
								})}
							</b>
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Fixed;
