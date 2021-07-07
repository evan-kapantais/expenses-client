export const getLocaleCurrency = (amount, currencySymbol) => {
	return amount.toLocaleString(navigator.location, {
		style: 'currency',
		currency: currencySymbol,
	});
};
