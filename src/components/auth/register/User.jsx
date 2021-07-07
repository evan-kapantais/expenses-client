import { useContext } from 'react';
import Text from '../../inputs/Text';
import Password from '../../inputs/Password';
import { useField } from '../../../hooks/hooks';
import { Context } from '../../../context/Context';

const User = (props) => {
	const {
		setstateName,
		setstateUsername,
		setStatePassword,
		setStateRepeatPassword,
		setStep,
	} = props;

	const { setNotif } = useContext(Context);

	const username = useField('text');
	const name = useField('text');
	const password = useField('password');
	const repeatPassword = useField('password');

	const handleCreateUser = (e) => {
		e.preventDefault();

		if (password.control.value !== repeatPassword.control.value) {
			return setNotif(true, 'Passwords must match.');
		}

		setstateUsername(username.control.value);
		setstateName(name.control.value);
		setStatePassword(password.control.value);
		setStateRepeatPassword(repeatPassword.control.value);
		setStep(1);
	};

	return (
		<form
			onSubmit={handleCreateUser}
			style={{
				height: '100%',
				display: 'flex',
				flexFlow: 'column nowrap',
				justifyContent: 'space-between',
			}}
		>
			<header>
				<h2>Create New User</h2>
			</header>
			<main>
				<div className='form-row-full'>
					<Text
						type='text'
						text='Username'
						value={username.control.value}
						setValue={username.setValue}
						required={true}
					/>
				</div>
				<div className='form-row-full'>
					<Text
						type='text'
						text='Name'
						value={name.control.value}
						setValue={name.setValue}
						required={true}
					/>
				</div>
				<div className='form-row-full'>
					<Password
						password={password.control.value}
						setPassword={password.setValue}
					/>
				</div>
				<div className='form-row-full'>
					<Password
						password={repeatPassword.control.value}
						setPassword={repeatPassword.setValue}
					/>
				</div>
			</main>
			<div className='buttons-row'>
				<button type='button' className='cancel'>
					Cancel
				</button>
				<input type='submit' value='Create User' />
			</div>
		</form>
	);
};

export default User;
