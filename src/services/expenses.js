import axios from 'axios';

const baseUrl = '/api/expenses';

// TODO: require authorization to delete transaction

let token = null;

const setToken = (string) => {
	token = `Bearer ${string}`;
};

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const getOne = (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

const addOne = async (object) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};

	const response = await axios.post(baseUrl, object, config);
	return response.data;
};

const deleteOne = async (id) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};

	const response = axios
		.delete(`${baseUrl}/${id}`, config)
		.then((res) => res.data);

	return response.data;
};

const expensesService = { getAll, getOne, addOne, deleteOne, setToken };

export default expensesService;
