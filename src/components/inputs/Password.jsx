import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	input {
		box-shadow: none;
		border-bottom: 1px solid lightgrey;
		border-radius: 0;

		&:focus {
			box-shadow: none;
			border-bottom: 1px solid #333;
		}
	}

	input:focus ~ label {
		top: -1rem;
		font-size: 0.7rem;
		transform: rotateX(360deg);
		color: #10a1b7;
	}

	label {
		position: absolute;
		top: ${(props) => (props.password ? '-1rem' : '0.5rem')};
		font-size: ${(props) => (props.password ? '0.7rem' : '0.85rem')};
		left: 0.3rem;
		transform: ${(props) =>
			props.password ? 'rotateX(360deg)' : 'rotateX(0deg)'};
	}

	button {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		color: grey;
		opacity: ${(props) => (props.password ? 1 : 0)};
		pointer-events: ${(props) => (props.password ? 'all' : 'none')};
		transition: all 200ms ease;

		&:hover,
		&:focus {
			color: #10a1b7;
		}
	}
`;

const Password = (props) => {
	const [inputType, setInputType] = useState('password');
	const { password, setPassword } = props;

	return (
		<Wrapper password={password}>
			<input
				type={inputType}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				id='password'
				required
			/>
			<button
				type='button'
				onClick={() =>
					setInputType(inputType === 'password' ? 'text' : 'password')
				}
			>
				{inputType === 'password' ? 'Show' : 'Hide'}
			</button>
			<label htmlFor='password'>Password *</label>
		</Wrapper>
	);
};

export default Password;
