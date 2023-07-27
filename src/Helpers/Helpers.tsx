import { Dispatch } from "react";
import { mazoListAdd, mazoRemoveAll, userLogout } from "../store";
import { AnyAction } from "redux";
import { CardViewState, FilterState, TypeFilter } from "./Interfaces";
import React from "react";
import axios from "axios";
import Nothing from "../Media/Generic.svg";
import Artifact from "../Media/Artifact.svg";
console.log("Nothing", Nothing);

//* Pasa la Carta a la derecha
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

//* Pasa la Carta a la izquierda
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

//* Monta un String segun el filtro de color
export const obtenerLetras = (filters: FilterState): string | null => {
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

//* Monta un String segun el filtro de rarity
export const obtenerRarity = (filters: {
	Common: boolean;
	Uncommon: boolean;
	Rare: boolean;
	Mythic: boolean;
}): string => {
	const { Common, Uncommon, Rare, Mythic } = filters;
	const rarity: string[] | null = [];

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

//* Para deslizar
export const to = (i: number) => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100,
	opacity: 1,
});

//* Para deslizar
export const from = (_i: number) => ({
	x: 0,
	rot: 0,
	scale: 1.5,
	y: -1000,
	opacity: 1,
});

//* Para deslizar
export const trans = (r: number, s: number) => {
	return `perspective(1500px) rotateX(30deg) rotateY(${
		r / 10
	}deg) rotateZ(${r}deg) scale(${s})`;
};

//*
export const LogOut = (dispatch: Dispatch<AnyAction>) => {
	dispatch(userLogout());
};

//* handleChangeSet
export const handleChangeSet = (
	field: string,
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>
) => {
	setFilters((prevFilters) => ({
		...prevFilters,
		[field]: !prevFilters[field],
	}));
};

//* ImageGenerator
export const ImageGenerator: React.FC<{
	field: string;
	img: string;
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
	clase: string;
}> = ({ field, img, filters, setFilters, clase }) => {
	console.log("img", img);
	return (
		<img
			className={filters[field] ? `${clase} border` : `${clase}`}
			src={img}
			alt={field}
			onClick={() => handleChangeSet(field, setFilters)}
		/>
	);
};

//* loadImage
export const loadImage = (url: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(url);
		image.onerror = (error) => reject(error);
		image.src = url;
	});
};

//* FetchMazos
export const FetchMazos = async (dispatch: Dispatch<AnyAction>) => {
	let newData;

	try {
		newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user") || ""
		);
	} catch (error) {
		console.error("Error al analizar el JSON:", error);
	}

	let token: any;
	if (newData) {
		token = newData.data.token;
	}
	try {
		const res = await fetch(
			/* "http://localhost:" + process.env.REACT_APP_PORT + "/getmazos/", */
			"http://192.168.0.21:" + process.env.REACT_APP_PORT + "/getmazos/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);

		if (!res.ok) {
			const errorText = await res.text();
			throw new Error(errorText);
		}

		const data = await res.json();
		dispatch(mazoRemoveAll());
		dispatch(mazoListAdd(data.mazos));
	} catch (err) {
		console.log("Error:", err);
	}
};

//* ImageComponent
export const ImageComponent = (FrontPage: any) => {
	const imageUrl = FrontPage;

	const imageStyles = {
		width: "73px",
		height: "73px",
		backgroundImage: `url(${imageUrl})`,
		backgroundSize: "150px auto", // Ajusta el tamaño del recorte según tus necesidades
		backgroundPosition: "-20px -30px", // Ajusta la posición del recorte según tus necesidades
	};

	return <div style={imageStyles}></div>;
};
//* handleFetchOneSavedMazos
export const handleFetchOneSavedMazos = async (IdMazo: any) => {
	let newData;

	try {
		newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user") || ""
		);
	} catch (error) {
		console.error("Error al analizar el JSON:", error);
	}

	let token: any;
	if (newData) {
		token = newData.data.token;
	}

	try {
		const res = await fetch(
			/* "http://localhost:" + */
			"http://192.168.0.21:" +
				process.env.REACT_APP_PORT +
				"/getmazos/" +
				IdMazo +
				"/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		);

		if (!res.ok) {
			const errorText = await res.text();
			throw new Error(errorText);
		}

		const data = await res.json();
		const dataConIdMazo: CardViewState = {
			Cards: data.mazos,
			IDMazo: IdMazo,
			FrontPage: data.imageUrl,
		};
		return dataConIdMazo;
	} catch (err) {
		console.log("Error:", err);
	}
};
