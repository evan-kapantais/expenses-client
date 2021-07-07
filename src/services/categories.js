import axios from 'axios';

const baseUrl = '/api/categories';

// TODO: require authorization to delete transaction

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = () => axios.get(baseUrl).then((res) => res.data);

const getOne = (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

const createOne = async (object) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};

	const response = await axios.post(baseUrl, object, config);
	return response.data;
};

const categoriesService = { setToken, getAll, getOne, createOne };

export default categoriesService;
