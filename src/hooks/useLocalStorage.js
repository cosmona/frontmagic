const { useState, useEffect } = require("react");

const useLocalStorage = (email, outsideInitialValue) => {
	const [value, setValue] = useState(() => {
		try {
			return (
				JSON.parse(localStorage.getItem(email)) || outsideInitialValue
			);
		} catch (e) {
			return outsideInitialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(email, JSON.stringify(value));
	}, [email, value]);

	return [value, setValue];
};

export default useLocalStorage;
