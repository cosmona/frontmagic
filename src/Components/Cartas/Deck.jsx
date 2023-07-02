import React, { Fragment, useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
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

/* const trans = (r, s) =>
	`perspective(1500px) rotateX(30deg) rotateY(${
		r / 10
	}deg) rotateZ(${r}deg) scale(${s})`; */

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

			params.page = page;
			params.pageSize = 10;

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
		page,
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

	useEffect(() => {}, [filters]);

	const buscarObjeto = () => {
		const objeto = cards[current].foreignNames.find((objeto) => {
			if (objeto.language === "Spanish") {
				return objeto;
			}
			return false;
		});
		return objeto;
	};

	const handleAddStore = (Name, ImageURL, ID, ManaCost) => {
		dispatch(cardAddOne({ Name, ImageURL, ID, ManaCost }));
	};

	/* const foundSpanishCard = () => {
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
 */

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
				const x = isGone
					? (200 + window.innerWidth) * dir
					: down
					? mx
					: 0;
				const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
				const scale = down ? 1.1 : 1;

				if (x >= 575) {
					// Aquí puedes realizar las acciones que deseas al detectar el desplazamiento hacia la derecha
					handleAddStore(
						cards[index].name,
						cards[index].imageUrl,
						cards[index].id,
						cards[index].manaCost
					);
				}

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
					setPage(page + 1);
					fetchCards();
					api.start((i) => to(i));
				}, 600);
			}
		}
	);

	return status === "Loading" ? (
		"<Loading />"
	) : (
		<>
			{props.map(({ x, y, rot, scale }, i) => (
				<animated.div className={styles.deck} key={i} style={{ x, y }}>
					<animated.div
						{...bind(i)}
						style={{
							backgroundImage: `url(${
								cards[i].imageUrl ? cards[i].imageUrl : noneCard
							})`,
						}}
					/>
				</animated.div>
			))}
		</>
	);
}

export default Deck;
