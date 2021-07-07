import React from 'react';
import { useField } from '../../hooks/hooks';

const Setup = () => {
	const savings = useField('number');
	const total = useField('number');

	return (
		<form>
			<label htmlFor='savings'>
				Total Assets
				<input {...total.control} />
			</label>
			<label htmlFor='savings'>
				Savings
				<input {...savings.control} min='0' max='100' />
			</label>
		</form>
	);
};

export default Setup;
