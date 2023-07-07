import React, { Fragment, useEffect, useState } from "react";
import { useSprings, animated, interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import axios from "axios";
import noneCard from "../../Media/nonecard.png";
import { obtenerLetras, obtenerRarity } from "../../Helpers/Helpers";
import Swipe from "../Swipe/Swipe";
import { useDispatch } from "react-redux";
import { cardAddOne } from "../../store";

import styles from "./Deck.styles.module.css";
import Loading from "../Loading/Loading";

const to = (i) => ({
	x: 0,
	y: i * -4,
	scale: 1,
	rot: -10 + Math.random() * 20,
	delay: i * 100,
});

const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
	`perspective(1500px) rotateX(30deg) rotateY(${
		r / 10
	}deg) rotateZ(${r}deg) scale(${s})`;

function Deck({ status, setStatus, filters }) {
	const {
		ColorRed,
		ColorBlack,
		ColorGreen,
		ColorWhite,
		ColorBlue,
		Common,
		Uncommon,
		Rare,
		Mythic,
	} = filters[0];

	const dispatch = useDispatch();
	const [cards, setCards] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState(0);
	const [gone] = useState(() => new Set());

	const [props, api] = useSprings(cards.length, (i) => ({
		...to(i),
		from: from(i),
	}));

	const fetchCards = async () => {
		try {
			setStatus("Loading");

			const letrasComb = obtenerLetras(filters[0]);

			const rarityFilter = obtenerRarity(filters[0]);

			let url = "https://api.magicthegathering.io/v1/cards?";

			const params = {};

			if (letrasComb) {
				params.colorIdentity = letrasComb;
			}

			if (rarityFilter) {
				params.rarity = rarityFilter;
			}

			console.log("page", page);
			params.page = page;
			params.pageSize = 10;

			console.log("url", url);
			console.log("params", params);
			const response = await axios.get(url, { params });
			setCards(response.data.cards);
			setStatus("Cargado");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchCards();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		ColorRed,
		ColorBlack,
		ColorGreen,
		ColorBlue,
		ColorWhite,
		Common,
		Uncommon,
		Rare,
		Mythic,
	]);

	useEffect(() => {
		fetchCards();
	}, [page]);

	const buscarObjeto = () => {
		const objeto = cards[current].foreignNames.find((objeto) => {
			if (objeto.language === "Spanish") {
				return objeto;
			}
			return false;
		});
		return objeto;
	};

	const handleAddStore = ({ name, imageUrl, id, manaCost }) => {
		console.log("handleAddStore", name);
		dispatch(cardAddOne({ name, imageUrl, id, manaCost }));
	};

	const bind = useDrag(
		({
			args: [index],
			down,
			movement: [mx],
			direction: [xDir],
			velocity,
		}) => {
			const trigger = velocity > 0.2;
			const dir = xDir < 0 ? -1 : 1;

			if (!down && trigger) gone.add(index);

			api.start((i) => {
				if (index !== i) return;
				const isGone = gone.has(index);

				console.log("window.innerWidth", window.innerWidth);
				const x = isGone
					? (200 + window.innerWidth) * dir
					: down
					? mx
					: 0;
				const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
				const scale = down ? 1.1 : 1;
				console.log("cards[index]", cards[index]);
				console.log("x", x);
				if (x >= 664 && isGone) handleAddStore(cards[index]);

				return {
					x,
					rot,
					scale,
					delay: undefined,
					config: {
						friction: 50,
						tension: down ? 800 : isGone ? 200 : 500,
					},
				};
			});

			if (!down && gone.size === cards.length) {
				setTimeout(() => {
					gone.clear();
					fetchCards();
					api.start((i) => to(i));
				}, 600);

				if (index === 0) {
					setPage((prevPage) => {
						console.log("prevPage", prevPage);

						return prevPage + 1;
					}); // Utiliza la función de actualización de estado para incrementar el valor de page
					console.log("Suma", page);
				}
			}
		}
	);

	return status === "Loading" ? (
		"<Loading />"
	) : (
		<>
			{cards.length > 0 && (
				<Fragment>
					<div className={styles.deck}>
						{props.map(({ x, y, rot, scale }, i) => (
							<animated.div
								className={styles.card}
								key={i}
								style={{
									x,
									y,
									transform: interpolate([rot, scale], trans),
								}}
								{...bind(i)}
							>
								<div
									style={{
										backgroundImage: `url(${
											cards[i].imageUrl
												? cards[i].imageUrl
												: noneCard
										})`,
									}}
								/>
							</animated.div>
						))}
					</div>
				</Fragment>
			)}
		</>
	);
}

export default Deck;
