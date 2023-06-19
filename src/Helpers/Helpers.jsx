export function handleNext(current, setCurrent, setPage, page) {
	if (current < 9) {
		setCurrent(current + 1);
	} else {
		setCurrent(0);
		setPage(page + 1);
	}
}
export function handleLast(current, setCurrent, setPage, page) {
	if (current > 0) {
		setCurrent(current - 1);
	} else {
		setCurrent(9);
		setPage(page - 1);
	}
}

export const obtenerLetras = (filters) => {
	const { ColorRed, ColorBlack, ColorGreen, ColorWhite, ColorBlue } = filters;
	const letras = [];

	if (ColorRed) {
		letras.push("R");
	}
	if (ColorBlack) {
		letras.push("B");
	}
	if (ColorGreen) {
		letras.push("G");
	}
	if (ColorWhite) {
		letras.push("W");
	}
	if (ColorBlue) {
		letras.push("U");
	}

	return letras.join(",");
};
