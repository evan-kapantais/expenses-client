import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';
import Password from '../inputs/Password';
import Text from '../inputs/Text';
import loginService from '../../services/login';
import transactionsService from '../../services/transactions';

const Login = () => {
	const { setUser, setCurrency, setNotif } = useContext(Context);
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const history = useHistory();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			setUser(user);
			setCurrency(user.currency);
			window.localStorage.setItem('expensesLoggedUser', JSON.stringify(user));
			transactionsService.setToken(user.token);
		} catch (error) {
			setNotif(true, 'Invalid username or password');
		}
	};

	return (
		<div>
			<form id='login-form' onSubmit={handleLogin}>
				<div className='form-row-full'>
					<Text
						type='text'
						text='Username'
						value={username}
						setValue={setUsername}
						required={true}
					/>
				</div>
				<div className='form-row-full'>
					<Password password={password} setPassword={setPassword} />
				</div>
				<input type='submit' style={{ marginBottom: '1rem' }} />
				<p className='instead'>
					Don't have an account? <br />
					<button
						type='button'
						className='text-button'
						onClick={() => history.push('/register')}
					>
						Register
					</button>{' '}
					instead.
				</p>
			</form>
		</div>
	);
};

export default Login;
