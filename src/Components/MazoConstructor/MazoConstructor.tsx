import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	cardRemoveAll,
	idMazoAdd,
	mazoRemove,
	cardRemove,
	mazoAddOne,
	cardFrontPageAdd,
} from "../../store";

import { Button, Image, Table, Header, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "./MazoConstructor.css";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { MazoConstructorProps } from "../../Helpers/PropsInterfaces";

function MazoConstructor({ cardView, menu, setMenu }: MazoConstructorProps) {
	const [isLista, setLista] = useState(true);
	/* const [scrollDirection, setScrollDirection] = React.useState("down"); */
	const dispatch = useDispatch();

	//! Borra una carta del cardView
	const handleRemoveMazo = (index: number) => {
		dispatch(cardRemove(index));
	};

	//!Establece la carta como portada
	const handleAddPortada = (imageUrl: any) => {
		dispatch(cardFrontPageAdd(imageUrl));
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
		}

		//* Si existe el mazo update sino crea uno nuevo
		if (cardView.IDMazo) {
			//!Update
		} else {
			//TODO
			const res = await fetch(
				/* "http://localhost:" + process.env.REACT_APP_PORT + "/mazos/", */
				"http://192.168.0.21:" + process.env.REACT_APP_PORT + "/mazos/",
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
						FrontPage: cardView.FrontPage,
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
	const handleMazoDelete = async (IDmazo: number | null) => {
		//*Agarra el token del local storage
		const newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user") || ""
		);
		let token;
		if (newData) {
			token = newData.data.token;
		}

		const res = await fetch(
			/* "http://localhost:" + */
			"http://192.168.0.21:" +
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
	const imageStyles = {
		width: "95vw",
		height: "100px",
		backgroundRepeat: "no-repeat",
		backgroundImage: `url(${cardView.FrontPage})`,
		backgroundSize: "455px auto",
		backgroundPosition: "-40px -130px",
		color: "white",
		fontSize: "25px",
		borderRadius: "10px 10px 0 0",
	};

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
							<Icon
								onClick={handleListaView}
								size="large"
								name="th"
							/>
						) : (
							<Icon
								onClick={handleListaView}
								size="large"
								name="th list"
							/>
						)}
						<div onClick={handleListaSave}>
							<Icon size="large" name="save" />
						</div>
						<div onClick={handleListaDelete}>
							<Icon size="large" name="eraser" />
						</div>
						<div onClick={() => handleMazoDelete(cardView.IDMazo)}>
							<Icon size="large" name="trash" />
						</div>
						<div
							className="TitleMazoConstructor"
							onClick={() => setMenu((prevMenu) => !prevMenu)}
						>
							Mazo
							<div className="filterIcon">
								{menu ? (
									<Icon
										name={
											"arrow alternate circle up outline"
										}
									/>
								) : (
									<Icon
										name={
											"arrow alternate circle down outline"
										}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Table className="TableConstructor" compact celled>
				<Table.Header style={imageStyles}>
					Mazo {cardView.IDMazo}
				</Table.Header>
				<Table.Body>
					{cardView.Cards &&
						cardView.Cards.map((mazoItem, index) => (
							<Table.Row>
								{isLista ? (
									<>
										<Table.Cell>
											<Header.Content>
												<Header image>
													<Header>
														<div className="FirstRow">
															<Image
																className="imagePreview"
																imagePreview
																src={
																	mazoItem.imageUrl
																}
															/>
															<div className="WrapperFirstRow">
																<div className="Name">
																	{
																		mazoItem.name
																	}
																</div>
																<div className="Type">
																	{
																		mazoItem.originalType
																	}
																</div>
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
											{mazoItem.types && (
												<Table.Cell>
													<Table.HeaderCell>
														Types
													</Table.HeaderCell>
													{mazoItem.types}
												</Table.Cell>
											)}

											{mazoItem.subtypes && (
												<Table.Cell>
													<Table.HeaderCell>
														Subtypes
													</Table.HeaderCell>
													{mazoItem.subtypes}
												</Table.Cell>
											)}
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
													handleAddPortada(
														mazoItem.imageUrl
													)
												}
												icon="image"
											/>
											<WhatsappShareButton
												url={mazoItem.imageUrl}
												title={mazoItem.imageUrl}
											>
												<img
													src={mazoItem.imageUrl}
													alt={mazoItem.name}
													style={{ display: "none" }}
												/>
												<WhatsappIcon size={32} round />{" "}
												{/* Puedes ajustar el tamaño del ícono */}
											</WhatsappShareButton>
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
