import { useContext, useState } from 'react';
import { useField } from '../../hooks/hooks';
import { Context } from '../../context/Context';
import savingsService from '../../services/savings';
import transactionsService from '../../services/transactions';
import CreateUserForm from './CreateUserForm';
import UserInitForm from './UserInitForm';

const Register = () => {
	const [tempUser, setTempUser] = useState(null);
	const { setUser, addToSavings } = useContext(Context);

	const year = new Date().getFullYear();

	// Current month
	const month = useField('number');

	// Total savings (same model as additional ones)
	const totalSavings = useField('number');

	// Fixed expenses
	const expenseName = useField('text');
	const expenseAmount = useField('number');

	const handleSubmitSavings = async (e) => {
		e.preventDefault();

		const newSavings = {
			amount: totalSavings.control.value,
			record: {
				month: month.control.value,
				year,
			},
		};

		const response = await savingsService.addOne(newSavings);
		setUser(tempUser);
		addToSavings(response);
		window.localStorage.setItem('expensesLoggedUser', JSON.stringify(tempUser));
	};

	return (
		<div>
			{!tempUser ? (
				<CreateUserForm setTempUser={setTempUser} />
			) : (
				<UserInitForm />
			)}
		</div>
	);
};

export default Register;
