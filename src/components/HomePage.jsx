import { useEffect } from 'react';
import Transactions from './Transactions';
import Balance from './Balance';
import Expenses from './Expenses';
import Income from './Income';
import User from './User';
import Overview from './Overview';
import Fixed from './Fixed';
import Menu from './Menu';
import { Context } from '../context/Context';

const HomePage = () => {
	return (
		<div id='home-page'>
			<div className='home-container'>
				<section className='side-left'>
					<User />
					<Balance />
					<Overview />
					<Fixed />
				</section>
				<section className='side-center'>
					<div className='side-center-top'>
						<Expenses />
						<Income />
					</div>
					<Transactions />
				</section>
				<section>
					<Menu />
				</section>
			</div>
		</div>
	);
};

export default HomePage;
