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
		top: ${(props) => (props.value ? '-1rem' : '0.5rem')};
		font-size: ${(props) => (props.value ? '0.7rem' : '0.85rem')};
		left: 0.3rem;
		transform: ${(props) =>
			props.value ? 'rotateX(360deg)' : 'rotateX(0deg)'};
	}
`;

const Password = ({ text, value, setValue }) => {
	return (
		<Wrapper value={value}>
			<input
				type='number'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				id={text.toLowerCase()}
				required
			/>
			<label htmlFor={text.toLowerCase()}>{text} *</label>
		</Wrapper>
	);
};

export default Password;
