import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactSVG } from "react-svg";
import {
	cardRemoveAll,
	idMazoAdd,
	mazoRemove,
	mazoRemoveAll,
	cardRemove,
	mazoListAdd,
	mazoAddOne,
} from "../../store";
import cardsIcon from "../../Media/cards.png";
import saveIcon from "../../Media/saveIcon.png";
import newIcon from "../../Media/newIcon.png";
import deleteIcon from "../../Media/deleteIcon.png";
import listIcon from "../../Media/listIcon.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDownShortWide,
	faArrowsUpDown,
	faBookmark,
	faDownLong,
	faFile,
	faListSquares,
	faSquare,
	faTrash,
	faTurnDown,
} from "@fortawesome/free-solid-svg-icons";

import { faBuromobelexperte } from "@fortawesome/free-brands-svg-icons";
import {
	Button,
	List,
	Image,
	Table,
	Header,
	Container,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./MazoConstructor.css";
library.add(faBuromobelexperte, faBookmark, faFile);

interface Card {
	name: string;
	imageUrl: string;
	id: string;
	manaCost: string;
	originalType: string;
	rarity: string;
	types: [];
	subtypes: [];
	originalText: string;
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
			<div className="WrapperMazoConstructor">
				<div>
					{mazo.IDMazo ? mazo.IDMazo : "(Not Saved)"} -
					{mazo.Cards && mazo.Cards.length}
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
						<div onClick={() => handleMazoDelete(mazo.IDMazo)}>
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
					<Table.HeaderCell>Mazo {mazo.IDMazo}</Table.HeaderCell>
				</Table.Header>
				<Table.Body>
					{mazo.Cards &&
						mazo.Cards.map((mazoItem, index) => (
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
