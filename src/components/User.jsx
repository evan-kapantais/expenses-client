import { useContext } from 'react';
import { Context } from '../context/Context';
import { months } from '../utils/dates';
import usersService from '../services/users';

const User = () => {
	const { user, resetData } = useContext(Context);

	// TODO: delete also all context data and preferences (resetData)
	const deleteUser = () => {
		usersService.deleteUser(user.id).then(() => resetData());
		window.localStorage.removeItem('expensesLoggedUser');
	};

	return (
		<div id='block-user' className='block block-small'>
			{user && (
				<>
					<h3 style={{ marginBottom: '0.2rem' }}>{user.name}</h3>
					<p
						style={{
							color: 'grey',
							fontSize: '0.85rem',
						}}
					>
						{months[user.record.month - 1]}, {user.record.year}
					</p>
				</>
			)}
		</div>
	);
};

export default User;
