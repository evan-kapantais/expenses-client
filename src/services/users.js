import axios from 'axios';

const baseUrl = '/api/users';

const getUser = (id) => axios.get(`${baseUrl}/${id}`).then((res) => res.data);

const updateUserMonth = (id, newValue) =>
	axios.put(`${baseUrl}/${id}`, newValue).then((res) => res.data);

const deleteUser = (id) =>
	axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

const usersService = { getUser, updateUserMonth, deleteUser };

export default usersService;
