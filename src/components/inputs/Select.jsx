import React from 'react';

const Select = (props) => {
	const { options, name } = props;

	return (
		<select name={name} id={name}>
			{options?.map((o) => (
				<option value={o.toLowerCase()}>{o}</option>
			))}
		</select>
	);
};

export default Select;
