import axios from 'axios';

const loginUrl = '/api/login';
const registerUrl = '/api/register';

// POST user for login
export const login = async (credentials) => {
	const response = await axios.post(loginUrl, credentials);
	return response.data;
};

export const register = async (credentials) => {
	const response = await axios.post(registerUrl, credentials);
	return response.data;
};

const loginService = { login, register };

export default loginService;
