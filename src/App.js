import { useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from './context/Context';
import AltRegister from './components/auth/AltRegister';
import Login from './components/auth/Login';
import Setup from './components/auth/Setup';
import HomePage from './components/HomePage';
import NewMonth from './components/NewMonth';
import Notif from './components/Notif';
import Dev from './components/Dev';
import usersService from './services/users';
import transactionsService from './services/transactions';
import { getCurrentTransactions, setAllTokens } from './utils/userData';

function App() {
	const {
		user,
		setUser,
		darkTheme,
		setTransactions,
		setSavings,
		setBudgets,
		setCurrency,
		setExpenses,
		setCategories,
	} = useContext(Context);

	// Get and set locally stored user
	useEffect(() => {
		const storedUser = JSON.parse(
			window.localStorage.getItem('expensesLoggedUser')
		);

		if (storedUser && storedUser.token) {
			setUser(storedUser);
		} else {
			window.localStorage.removeItem('expensesLoggedUser');
			setUser(null);
		}
	}, []);

	// Add user savings
	useEffect(() => {
		if (user) {
			usersService.getUser(user.id).then((res) => {
				setAllTokens(user.token);

				setSavings(res.savings);
				setBudgets(res.budgets);
				setCurrency(res.currency);
				setExpenses(res.expenses);
				setCategories(res.categories);

				transactionsService.getAll().then((res) => {
					const filteredTransactions = getCurrentTransactions(user, res);
					setTransactions(filteredTransactions);
				});
			});
		}
	}, [user]);

	return (
		<div className={`App ${darkTheme ? 'App-dark' : 'App-light'}`}>
			<Switch>
				<Route path='/new-month'>
					<NewMonth />
				</Route>
				<Route path='/setup'>
					<Setup />
				</Route>
				<Route path='/login'>
					{user && <Redirect to='/' />}
					<Login />
				</Route>
				<Route path='/register'>
					{user && <Redirect to='/' />}
					<AltRegister />
				</Route>
				<Route exact path='/'>
					{!user && <Redirect to='/login' />}
					<HomePage />
				</Route>
			</Switch>
			<Dev />
			<Notif />
		</div>
	);
}

export default App;
