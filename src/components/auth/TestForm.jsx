import { useContext, useState } from 'react';
import { useField, useMonthField } from '../../hooks/hooks';
import { Context } from '../../context/Context';
import CreateUserForm from './CreateUserForm';
import UserInitForm from './UserInitForm';

const Register = () => {
	const [tempUser, setTempUser] = useState(null);
	const { setUser, setNotif, addToSavings } = useContext(Context);

	return <div>{!tempUser ? <CreateUserForm /> : <UserInitForm />}</div>;
};

export default Register;
