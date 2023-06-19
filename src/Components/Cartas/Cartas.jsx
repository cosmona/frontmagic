import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import noneCard from "../../Media/nonecard.png";
import "./Cartas.css";
import AddButtons from "../AddButtons/AddButtons";
import { handleNext, handleLast } from "../../Helpers/Helpers";
import { obtenerLetras } from "../../Helpers/Helpers";
import Swipe from "../Swipe/Swipe";

function Cartas({ filters }) {
	const { ColorRed, ColorBlack, ColorGreen, ColorWhite, ColorBlue } =
		filters[0];

	const [cards, setCards] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState(0);

	const fetchCards = async () => {
		setLoading(true);
		try {
			const letrasComb = obtenerLetras(filters[0]);

			const response = await axios.get(
				"https://api.magicthegathering.io/v1/cards",
				{
					params: {
						page: page,
						pageSize: 10,
						colorIdentity: letrasComb,
					},
				}
			);
			setCards(response.data.cards);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};
	const myElementRef = useRef(null);

	useEffect(() => {
		fetchCards();
	}, [page, ColorRed, ColorBlack, ColorGreen, ColorBlue, ColorWhite]);

	const buscarObjeto = () => {
		const objeto = cards[current].foreignNames.find((objeto) => {
			if (objeto.language === "Spanish") {
				return objeto;
			}
			return false;
		});
		return objeto;
	};

	const foundSpanishCard = () => {
		const objetoEncontrado = buscarObjeto();
		if (objetoEncontrado) {
			return (
				<Swipe
					current={current}
					setCurrent={setCurrent}
					imageUrl={objetoEncontrado.imageUrl}
					setPage={setPage}
					page={page}
				/>
			);
		} else {
			return (
				<Swipe
					current={current}
					setCurrent={setCurrent}
					setPage={setPage}
					page={page}
					imageUrl={cards[current].imageUrl}
				/>
			);
		}
	};

	return (
		<Fragment>
			{!loading ? (
				<Fragment>
					{`${current}/${page}`}
					<div className="Content-Direction">
						{/* Si esta en la pagina 1 y en la carta priera oculta el boton*/}
						{current === 0 && page === 1 ? null : (
							<Fragment>
								<div
									onClick={() =>
										handleLast(
											current,
											setCurrent,
											setPage,
											page
										)
									}
								>
									◀️
								</div>
							</Fragment>
						)}
						<div
							onClick={() =>
								handleNext(current, setCurrent, setPage, page)
							}
						>
							▶️
						</div>
					</div>
					<div className="wrapper">
						<div>{cards[current].name}</div>
						{cards[current].foreignNames ? (
							foundSpanishCard()
						) : (
							<Swipe
								current={current}
								setCurrent={setCurrent}
								setPage={setPage}
								page={page}
								imageUrl={noneCard}
							/>
						)}
						<AddButtons
							current={current}
							setCurrent={setCurrent}
							setPage={setPage}
							page={page}
							carta={cards[current]}
						/>
					</div>
				</Fragment>
			) : (
				<div>Loading...</div>
			)}
		</Fragment>
	);
}

export default Cartas;
