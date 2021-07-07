import { useState } from 'react';

export const useField = (type) => {
	const [value, setValue] = useState('');

	const onChange = (e) => setValue(e.target.value);
	const reset = () => setValue('');

	return {
		control: { type, value, onChange },
		reset,
		setValue,
	};
};

export const useCheckboxField = (name) => {
	const [checked, setChecked] = useState(false);

	const onChange = () => setChecked(!checked);
	const reset = () => setChecked(false);

	return {
		control: { type: 'checkbox', name, checked, onChange },
		reset,
		setChecked,
	};
};

export const useDateField = () => {
	const d = new Date();
	const date = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
	const month =
		d.getMonth() < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
	const year = d.getFullYear();
	const today = `${year}-${month}-${date}`;

	const [value, setValue] = useState(today);

	const onChange = (e) => setValue(e.target.value);
	const reset = () => setValue(today);

	return {
		control: { type: 'date', value, onChange },
		reset,
		setValue,
	};
};

export const useMonthField = () => {
	const d = new Date();
	const month =
		d.getMonth() < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
	const year = d.getFullYear();

	const [value, setValue] = useState(`${year}-${month}`);

	const onChange = (e) => setValue(e.target.value);
	const reset = () => setValue(`${year}-${month}`);

	return {
		control: { type: 'month', value, onChange },
		reset,
		setValue,
	};
};
