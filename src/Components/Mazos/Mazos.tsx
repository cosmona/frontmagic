import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	cardAdd,
	mazoRemoveAll,
	cardRemoveAll,
	mazoListAdd,
} from "../../store";
import "./Mazos.css";

type Card = {
	name: string;
	imageUrl: string;
};

interface CardViewState {
	Cards: Card[];
	IDMazo: number | null;
}

type Mazos = {
	ID: number;
	NameMazo: string;
	User: number;
};

interface MazosProps {
	mazos: Mazos[];
	cardView?: CardViewState[];
}

function Mazos({ mazos }: MazosProps) {
	const [cardView, setCardView] = useState<CardViewState | null>(null);

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

	const dispatch = useDispatch();

	useEffect(() => {
		fetchMazos();
	}, []);

	const fetchMazos = async () => {
		try {
			const res = await fetch(
				"http://localhost:" + process.env.REACT_APP_PORT + "/getmazos/",
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

	const fetchSavedMazos = async (IdMazo: number) => {
		try {
			const res = await fetch(
				"http://localhost:" +
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
			const dataConIdMazo = { IDMazo: IdMazo, Cards: data.mazos };
			setCardView(dataConIdMazo); // Actualiza el estado con los mazos recibidos
			dispatch(cardAdd(dataConIdMazo));
		} catch (err) {
			console.log("Error:", err);
		}
	};

	const handleLoadingMazo = (IdMazo: number) => {
		//Borra Store
		dispatch(cardRemoveAll());
		// Carga mazo
		//mete mazo nuevo en la store
		fetchSavedMazos(IdMazo);
	};

	return (
		<div>
			<h1>Mazos</h1>
			<ul className="ListaMazos">
				{mazos &&
					mazos.map((mazo) => (
						<li
							className="Card"
							key={mazo.ID}
							onClick={() => handleLoadingMazo(mazo.ID)}
						>
							{mazo.ID}
						</li>
					))}
			</ul>
		</div>
	);
}

export default Mazos;
