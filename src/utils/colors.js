export const getRandomColor = () => {
	return `rgb(${(Math.random() * 251).toFixed()}, ${(
		Math.random() * 251
	).toFixed()}, ${(Math.random() * 251).toFixed()})`;
};
