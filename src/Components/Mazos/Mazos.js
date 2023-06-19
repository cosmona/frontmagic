import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Mazos.css";
import { cardAdd, mazoRemoveAll, cardRemoveAll } from "../../store";

function Mazos() {
	const [mazos, setMazos] = useState([]);
	const [cardView, setCardView] = useState({});

	const newData = JSON.parse(
		localStorage.getItem("redux_localstorage_simple_user")
	);
	let token;
	if (newData) {
		token = newData.data.token;
	}

	const dispatch = useDispatch();

	useEffect(() => {
		fetchMazos();
	}, []);

	useEffect(() => {
		console.log("cardView actualizado:", cardView);
	}, [cardView]);

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
			setMazos(data.mazos); // Actualiza el estado con los mazos recibidos
		} catch (err) {
			console.log("Error:", err);
		}
	};

	const fetchSavedMazos = async (IdMazo) => {
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
			const dataConIdMazo = { IDMazo: IdMazo, Cards: [data.mazos.Cards] };
			console.log("dataConIdMazo", dataConIdMazo);
			setCardView(dataConIdMazo); // Actualiza el estado con los mazos recibidos
			console.log("cardView", cardView);
			dispatch(cardAdd(dataConIdMazo));
		} catch (err) {
			console.log("Error:", err);
		}
	};

	const handleLoadingMazo = (IdMazo) => {
		console.log("IdMazo", IdMazo);
		//Borra Store
		dispatch(cardRemoveAll());
		// Carga mazo
		//mete mazo nuevo en la store
		fetchSavedMazos(IdMazo);
	};

	return (
		<div>
			<h1>Mazos</h1>
			{
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
			}
		</div>
	);
}

export default Mazos;
