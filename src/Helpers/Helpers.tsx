export function handleNext(
	current: number,
	setCurrent: React.Dispatch<React.SetStateAction<number>>,
	setPage: React.Dispatch<React.SetStateAction<number>>,
	page: number
): void {
	if (current < 9) {
		setCurrent(current + 1);
	} else {
		setCurrent(0);
		setPage(page + 1);
	}
}

export function handleLast(
	current: number,
	setCurrent: React.Dispatch<React.SetStateAction<number>>,
	setPage: React.Dispatch<React.SetStateAction<number>>,
	page: number
): void {
	if (current > 0) {
		setCurrent(current - 1);
	} else {
		setCurrent(9);
		setPage(page - 1);
	}
}

export const obtenerLetras = (filters: {
	ColorRed: boolean;
	ColorBlack: boolean;
	ColorGreen: boolean;
	ColorWhite: boolean;
	ColorBlue: boolean;
}): string => {
	const { ColorRed, ColorBlack, ColorGreen, ColorWhite, ColorBlue } = filters;
	const letras: string[] = [];

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

export const obtenerRarity = (filters: {
	Common: boolean;
	Uncommon: boolean;
	Rare: boolean;
	Mythic: boolean;
}): string => {
	const { Common, Uncommon, Rare, Mythic } = filters;
	const rarity: string[] = [];

	if (Common) {
		rarity.push("Common");
	}
	if (Uncommon) {
		rarity.push("Uncommon");
	}
	if (Rare) {
		rarity.push("Rare");
	}
	if (Mythic) {
		rarity.push("Mythic");
	}

	return rarity.join(" ");
};

export const to = (i: number) => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100,
	opacity: 1,
});
export const from = (_i: number) => ({
	x: 0,
	rot: 0,
	scale: 1.5,
	y: -1000,
	opacity: 1,
});
export const trans = (r: number, s: number) =>
	`perspective(1500px) rotateX(30deg) rotateY(${
		r / 10
	}deg) rotateZ(${r}deg) scale(${s})`;
