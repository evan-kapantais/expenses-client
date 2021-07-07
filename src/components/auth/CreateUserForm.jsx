import { useContext, useState } from 'react';
import { useField, useMonthField } from '../../hooks/hooks';
import { Context } from '../../context/Context';
import { useHistory } from 'react-router-dom';
import loginService from '../../services/login';
import savingsService from '../../services/savings';
import transactionsService from '../../services/transactions';

const CreateUserForm = ({ setTempUser }) => {
	const { setNotif } = useContext(Context);
	const history = useHistory();

	const year = new Date().getFullYear();

	// Input fields control
	const username = useField('text');
	const name = useField('text');
	const password = useField('password');
	const repeatPassword = useField('password');
	const month = useMonthField();

	// TODO: month number should be between 1 and 12
	// TODO: notify if user already exists
	const handleRegister = async (e) => {
		e.preventDefault();

		if (password.control.value !== repeatPassword.control.value) {
			return setNotif(true, "Passwords don't match");
		}

		const newUser = {
			username: username.control.value,
			name: name.control.value,
			password: password.control.value,
			record: {
				month: Number(month.control.value.slice(5)),
				year,
			},
		};

		try {
			const response = await loginService.register(newUser);
			transactionsService.setToken(response.token);
			savingsService.setToken(response.token);
			setNotif(false, 'User created successfully!');
			setTempUser(newUser);
		} catch (error) {
			console.log(error);
			setNotif(true, error.message);
		}
	};

	const prefill = () => {
		month.setValue(month.control.value);
		username.setValue('root');
		name.setValue('Root');
		password.setValue('root');
		repeatPassword.setValue('root');
	};

	return (
		<form id='login-form' onSubmit={handleRegister}>
			<h2 className='form-heading'>Create User</h2>
			<div className='form-row'>
				<div>
					<label htmlFor='username'>Username *</label>
					<input {...username.control} id='username' required />
				</div>
				<div>
					<label htmlFor='name'>Name *</label>
					<input {...name.control} id='name' required />
				</div>
			</div>
			<div className='form-row'>
				<div>
					<label htmlFor='password'>Password *</label>
					<input {...password.control} id='password' required />
				</div>
				<div>
					<label htmlFor='repeat-password'>Repeat Password *</label>
					<input
						{...repeatPassword.control}
						name='repeat-password'
						id='repeat-password'
						required
					/>
				</div>
			</div>
			<div className='form-row-full'>
				<label htmlFor='month'>Current Month *</label>
				<input {...month.control} />
			</div>
			<input type='submit' />
			<button
				type='button'
				onClick={prefill}
				style={{ position: 'absolute', top: 0, right: 0 }}
			>
				Prefill
			</button>
			<p className='instead'>
				Already have an account? <br />
				<button
					type='button'
					className='text-button'
					onClick={() => history.push('/login')}
				>
					Log in
				</button>{' '}
				instead.
			</p>
		</form>
	);
};

export default CreateUserForm;
