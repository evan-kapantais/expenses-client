import React from 'react';
import { useHistory } from 'react-router-dom';

const CloseButton = ({ color }) => {
	const history = useHistory();

	const handleClose = () => {
		const confirm = window.confirm(
			'Are you sure you want to cancel the new month creation?'
		);

		if (!confirm) {
			return;
		}

		history.push('/');
	};

	return (
		<button
			type='button'
			className={`close-button close-button-${color}`}
			onClick={handleClose}
		>
			+
		</button>
	);
};

export default CloseButton;
