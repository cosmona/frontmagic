import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	cardRemoveAll,
	idMazoAdd,
	mazoRemove,
	cardRemove,
	mazoAddOne,
} from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBookmark,
	faFile,
	faListSquares,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { faBuromobelexperte } from "@fortawesome/free-brands-svg-icons";
import { Button, Image, Table, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./MazoConstructor.css";
import { CardData } from "../../Helpers/Interfaces";
/* import { library } from "@fortawesome/fontawesome-svg-core"; */
/* library.add(faBuromobelexperte, faBookmark, faFile, faListSquares, faTrash); */

interface Mazo {
	IDMazo: number;
	Cards: CardData[];
}

interface MazoConstructorProps {
	cardView: Mazo;
}

function MazoConstructor({ cardView }: MazoConstructorProps) {
	const [isLista, setLista] = useState(true);
	/* const [scrollDirection, setScrollDirection] = React.useState("down"); */
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
		if (cardView.IDMazo) {
			//!Update
		} else {
			//TODO
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
						Lista: cardView.Cards,
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
									Cards: cardView.Cards,
									IDMazo: data.questionID,
								})
							);
							//* Añade el mazo a la store.mazos
							const nuevoObjeto = {
								ID: data.questionID,
								NameMazo: data.questionID,
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
					/* res.json().then((data) => {}); */
					//* Borra toda la store.cardview
					dispatch(cardRemoveAll());
					//* Borra el mazo la store.mazos
					dispatch(mazoRemove(IDmazo));
				}
			})
			.catch((err) => {
				console.log("caught it!", err);
			});
	};

	/* 
	const handleDownUp = () => {
		if (scrollDirection === "down") {
			window.scrollBy({
				top: document.documentElement.scrollHeight,
				behavior: "smooth",
			});
			setScrollDirection("up");
		} else {
			window.scrollBy({
				top: -document.documentElement.scrollHeight,
				behavior: "smooth",
			});
			setScrollDirection("down");
		}
	}; */

	// Renderiza la lista de mazos

	return (
		<div className="content-MazoConstructor">
			<div className="WrapperMazoConstructor">
				{/* 	<div className="downIcon">
					<FontAwesomeIcon
						icon={faArrowsUpDown}
						size="xl"
						onClick={() => handleDownUp()}
					/>
				</div> */}
				<div>
					{cardView.IDMazo ? cardView.IDMazo : "(Not Saved)"} -
					{cardView.Cards && cardView.Cards.length}
				</div>
				<div className="menu-MazoConsructor">
					<div className="Buttons">
						{isLista ? (
							<div
								className="cardsIcon"
								onClick={handleListaView}
							>
								<FontAwesomeIcon
									size="xl"
									icon={faBuromobelexperte}
								/>
							</div>
						) : (
							<div onClick={handleListaView}>
								<FontAwesomeIcon
									className="listicon"
									size="xl"
									icon={faListSquares}
								/>
							</div>
						)}

						<div onClick={handleListaSave}>
							<FontAwesomeIcon
								className="saveIcon"
								icon={faBookmark}
								size="xl"
								style={{ color: "#ffffff" }}
							/>
						</div>

						<div onClick={handleListaDelete}>
							<FontAwesomeIcon
								className="newIcon"
								size="xl"
								icon={faFile}
							/>
						</div>
						<div onClick={() => handleMazoDelete(cardView.IDMazo)}>
							<FontAwesomeIcon
								className="deleteIcon"
								size="xl"
								icon={faTrash}
							/>
						</div>
					</div>
				</div>
			</div>
			<Table compact celled>
				<Table.Header>
					<Table.HeaderCell>Mazo {cardView.IDMazo}</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
					{cardView.Cards &&
						cardView.Cards.map((mazoItem, index) => (
							<Table.Row>
								{isLista ? (
									<>
										<Table.Cell>
											<Header.Content>
												<Header as="h4" image>
													<Header>
														<Image
															className="imagePreview"
															imagePreview
															src={
																mazoItem.imageUrl
															}
														/>
														<div>
															<div>
																{mazoItem.name}
															</div>
															<div>
																{
																	mazoItem.originalType
																}
															</div>
														</div>
													</Header>
													<Header.Subheader>
														{mazoItem.originalText}
													</Header.Subheader>
												</Header>
											</Header.Content>
										</Table.Cell>
										<div className="wrapperData">
											<Table.Cell>
												<Table.HeaderCell>
													Mana
												</Table.HeaderCell>
												{mazoItem.manaCost}
											</Table.Cell>
											<Table.Cell>
												<Table.HeaderCell>
													Rarity
												</Table.HeaderCell>
												{mazoItem.rarity}
											</Table.Cell>
											<Table.Cell>
												{" "}
												<Table.HeaderCell>
													Types
												</Table.HeaderCell>
												{mazoItem.types}
											</Table.Cell>
											<Table.Cell>
												<Table.HeaderCell>
													Subtypes
												</Table.HeaderCell>
												{mazoItem.subtypes}
											</Table.Cell>
										</div>
										<Table.Cell collapsing>
											<Button
												onClick={() =>
													handleRemoveMazo(index)
												}
												icon="trash"
											/>
											<Button
												onClick={() =>
													handleAddPortada(index)
												}
												icon="image"
											/>
										</Table.Cell>
									</>
								) : (
									<Image
										imagePreview
										src={mazoItem.imageUrl}
									/>
								)}
							</Table.Row>
						))}
				</Table.Body>
			</Table>
		</div>
	);
}

export default MazoConstructor;
