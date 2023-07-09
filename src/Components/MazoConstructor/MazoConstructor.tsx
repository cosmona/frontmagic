import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	cardRemoveAll,
	idMazoAdd,
	mazoRemove,
	mazoRemoveAll,
	cardRemove,
	mazoListAdd,
	mazoAddOne,
} from "../../store";

import "./MazoConstructor.css";

interface Card {
	name: string;
	imageUrl: string;
	id: string;
}

interface Mazo {
	IDMazo: number;
	Cards: Card[];
}

interface MazoConstructorProps {
	mazo: Mazo;
}

function MazoConstructor({ mazo }: MazoConstructorProps) {
	const [isLista, setLista] = useState(true);
	const [status, setStatus] = useState("");

	const dispatch = useDispatch();

	//! Borra una carta del cardView
	const handleRemoveMazo = (index: number) => {
		dispatch(cardRemove(index));
	};

	//!Controla la vista si es lista o galeria
	const handleListaView = () => {
		setLista(!isLista);
	};

	//!Vacia la cardView
	const handleListaDelete = () => {
		dispatch(cardRemoveAll());
	};

	//! Salva un mazo nuevo
	const handleListaSave = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("Saving");

		//*Agarra el token del local storage
		const newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user") || ""
		);

		let token;
		if (newData) {
			token = newData.data.token;
			console.log("token", token);
		}

		//* Si existe el mazo update sino crea uno nuevo
		if (mazo.IDMazo) {
			//Update
		} else {
			const res = await fetch(
				"http://localhost:" + process.env.REACT_APP_PORT + "/mazos/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({
						email: "inakipf@gmail.com",
						password: "123456789",
						NameMazo: "222sasa",
						User: 1,
						Lista: mazo.Cards,
					}),
				}
			)
				.then((res) => {
					if (!res.ok) {
						return res.text().then((text) => {
							throw new Error(text);
						});
					} else {
						res.json().then((data) => {
							//* Añade el IDMAzo y las cartas a la store.cardview
							dispatch(
								idMazoAdd({
									Cards: mazo.Cards,
									IDMazo: data.questionID,
								})
							);
							//* Añade el mazo a la store.mazos
							const nuevoObjeto = {
								id: data.questionID,
								NameMazo: "kjahjk",
								User: 1,
							};
							dispatch(mazoAddOne(nuevoObjeto));
						});
					}
				})
				.catch((err) => {
					console.log("caught it!", err);
				});
		}
	};

	//! Borra el mazo
	const handleMazoDelete = async (IDmazo: number) => {
		//* Borra toda la store.cardview
		dispatch(cardRemoveAll());
		//* Borra el mazo la store.mazos
		dispatch(mazoRemove(IDmazo));

		setStatus("Saving");
		//*Agarra el token del local storage
		const newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user") || ""
		);
		let token;
		if (newData) {
			token = newData.data.token;
		}

		const res = await fetch(
			"http://localhost:" +
				process.env.REACT_APP_PORT +
				"/deletemazo/" +
				IDmazo +
				"/",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			}
		)
			.then((res) => {
				if (!res.ok) {
					return res.text().then((text) => {
						throw new Error(text);
					});
				} else {
					res.json().then((data) => {});
					dispatch(mazoRemoveAll());
				}
			})
			.catch((err) => {
				console.log("caught it!", err);
			});
	};

	// Renderiza la lista de mazos
	return (
		<div className="content-MazoConstructor">
			<header>
				<h2>
					Cartas del Mazo -{mazo.IDMazo} - {mazo.Cards.length}
				</h2>
			</header>
			<div className="menu-MazoConsructor">
				<div className="Buttons">
					{isLista ? (
						<div onClick={handleListaView}>Cartas</div>
					) : (
						<div onClick={handleListaView}>lista</div>
					)}

					<div onClick={handleListaSave}>Salvar</div>

					<div onClick={handleListaDelete}>Nuevo</div>
					<div onClick={() => handleMazoDelete(mazo.IDMazo)}>
						Borrar
					</div>
				</div>
			</div>
			<ul className="list-MazoConstructor">
				{mazo.Cards.map((mazoItem, index) => (
					<li key={index}>
						{isLista ? (
							mazoItem.name
						) : (
							<img
								src={mazoItem.imageUrl}
								alt={index.toString()}
							/>
						)}

						<button onClick={() => handleRemoveMazo(index)}>
							Eliminar
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default MazoConstructor;
