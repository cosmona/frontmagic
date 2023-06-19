import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	cardRemoveAll,
	idMazoAdd,
	mazoRemove,
	mazoRemoveAll,
} from "../../store";
import "./MazoConstructor.css";

function MazoConstructor() {
	const [isLista, setLista] = useState(true);
	const [status, setStatus] = useState("");
	const [mazo, setMazo] = useState(useSelector((state) => state.cardview));

	const dispatch = useDispatch();

	// Verifica si el estado 'mazo' está vacío o nulo
	if (!mazo) {
		return <div>No hay mazos disponibles.</div>;
	}

	const handleRemoveMazo = (index) => {
		dispatch(mazoRemove(index));
	};

	const handleListaView = () => {
		setLista(!isLista);
	};

	const handleListaDelete = () => {
		dispatch(mazoRemoveAll());
	};

	const handleListaSave = async (e) => {
		// Call sethShow from parent(setShowLogin) function and set to false for close the modal

		e.preventDefault();
		setStatus("Saving");
		//*Agarra el token del local storage
		const newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user")
		);
		let token;
		if (newData) {
			token = newData.data.token;
		}
		console.log("mazo", mazo);
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
					console.log("res", res);
					if (!res.ok) {
						return res.text().then((text) => {
							throw new Error(text);
						});
					} else {
						res.json().then((data) => {
							dispatch(
								idMazoAdd({
									Cards: mazo.Cards,
									idMazo: data.questionID,
								})
							);
						});
					}
				})
				.catch((err) => {
					console.log("caught it!", err);
				});
		}
	};

	const handleMazoDelete = async (IDmazo) => {
		dispatch(cardRemoveAll());
		setStatus("Saving");
		//*Agarra el token del local storage
		const newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user")
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
							<img src={mazoItem.imageUrl} alt={index} />
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
