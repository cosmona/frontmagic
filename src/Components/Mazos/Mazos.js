import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Mazos.css";
import {
	cardAdd,
	mazoRemoveAll,
	cardRemoveAll,
	mazoListAdd,
} from "../../store";

function Mazos({ mazos }) {
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
			console.log("data.mazos", data.mazos);
			dispatch(mazoListAdd(data.mazos));
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
			console.log("data", data);
			const dataConIdMazo = { IDMazo: IdMazo, Cards: data.mazos };
			setCardView(dataConIdMazo); // Actualiza el estado con los mazos recibidos
			console.log("dataConIdMazo", dataConIdMazo);
			dispatch(cardAdd(dataConIdMazo));
		} catch (err) {
			console.log("Error:", err);
		}
	};

	const handleLoadingMazo = (IdMazo) => {
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
