import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
`;

const ExpenseRow = ({ expense }) => {
	return (
		<Div>
			<p>{expense.name}</p>
			<p>
				<b>{expense.amount}</b>
			</p>
		</Div>
	);
};

export default ExpenseRow;
