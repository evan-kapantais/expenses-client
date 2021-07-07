import { useContext } from 'react';
import users from '../services/users';
import { Context } from '../context/Context';

const Dev = () => {
	const { setUser, user } = useContext(Context);

	const resetMonth = async () => {
		const response = await users.updateUserMonth(user.id, {
			record: { month: 3, year: 2021 },
		});

		setUser(response);
		window.localStorage.setItem('expensesLoggedUser', JSON.stringify(response));
	};

	const resetEverything = () => {};

	return (
		<ul id='dev'>
			<li>
				<button type='button' onClick={resetMonth}>
					Reset user month
				</button>
			</li>
			<li>
				<button type='button'>Delete all transactions</button>
			</li>
			<li>
				<button type='button' onClick={resetEverything}>
					Reset Everything
				</button>
			</li>
		</ul>
	);
};

export default Dev;
