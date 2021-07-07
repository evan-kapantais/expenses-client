import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context/Context';

const Div = styled.div`
	position: absolute;
	top: 2rem;
	left: ${(props) => (props.notif.text ? '2rem' : '1rem')};
	padding: 1rem;
	border-left-width: 5px;
	border-left-style: solid;
	border-left-color: ${(props) => (props.notif.isError ? 'red' : 'green')};
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 0 1px rgba(0, 0, 0, 0.1);
	opacity: ${(props) => (props.notif.text ? 1 : 0)};
	transition: all 400ms ease-in-out;
`;

const Notif = () => {
	const { notif } = useContext(Context);

	return (
		<Div notif={notif}>
			<p>
				<b>{notif.text}</b>
			</p>
		</Div>
	);
};

export default Notif;
