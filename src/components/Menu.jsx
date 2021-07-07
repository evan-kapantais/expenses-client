import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';
import icons from '../utils/icons';
import usersService from '../services/users';

const Menu = () => {
	const { user, setUser, darkTheme, toggleTheme, resetData } = useContext(
		Context
	);
	const history = useHistory();

	const handleLogout = () => {
		window.localStorage.removeItem('expensesLoggedUser');
		resetData();
	};

	const getNewRecord = () => {
		if (user.record.month < 12) {
			return {
				record: {
					month: user.record.month + 1,
					year: user.record.year,
				},
			};
		} else {
			return {
				record: {
					month: 1,
					year: user.record.year + 1,
				},
			};
		}
	};

	const handleNewMonth = async () => {
		history.push('/new-month');
		// const response = await users.updateUserMonth(user.id, getNewRecord());
		// setUser(response);
		// window.localStorage.setItem('expensesLoggedUser', JSON.stringify(response));
	};

	// TODO: also delete all context data and preferences (resetData)
	const deleteUser = () => {
		usersService.deleteUser(user.id).then(() => resetData());
		window.localStorage.removeItem('expensesLoggedUser');
	};

	return (
		<div id='menu'>
			<button type='button' onClick={handleLogout}>
				<img
					src={darkTheme ? icons.logoutWhite : icons.logout}
					alt='door icon'
				/>
				<p style={{ color: darkTheme ? '#fff' : '#333' }}>Log Out</p>
			</button>
			<button type='button' onClick={toggleTheme}>
				<img
					src={darkTheme ? icons.browserWhite : icons.browser}
					alt='browser icon'
				/>
				<p style={{ color: darkTheme ? '#fff' : '#333' }}>Toggle Theme</p>
			</button>
			<button type='button' onClick={handleNewMonth}>
				<img
					src={darkTheme ? icons.newMonthWhite : icons.newMonth}
					alt='calendar icon'
				/>
				<p style={{ color: darkTheme ? '#fff' : '#333' }}>New Month</p>
			</button>
			<button type='button'>
				<img
					src={darkTheme ? icons.pastMonthsWhite : icons.pastMonths}
					alt='calendar icon'
				/>
				<p style={{ color: darkTheme ? '#fff' : '#333' }}>View Past Months</p>
			</button>
			<button type='button'>
				<img
					src={darkTheme ? icons.deleteUserWhite : icons.deleteUser}
					alt='delete user icon'
				/>
				<p style={{ color: darkTheme ? '#fff' : '#333' }}>Delete User</p>
			</button>
		</div>
	);
};

export default Menu;
