import React, { Fragment, useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import axios from "axios";
import noneCard from "../../Media/nonecard.png";
import { obtenerLetras, obtenerRarity, to, from } from "../../Helpers/Helpers";
import { useDispatch } from "react-redux";
import { cardAddOne } from "../../store";
import Loading from "../Loading/Loading";
import { CardData, FilterState } from "../../Helpers/Interfaces";
import "./Deck.css";

interface Deckprops {
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	filters: FilterState;
}

interface paramsInterface {
	colorIdentity: string | null;
	page: number;
	pageSize: number;
	rarity: string | null;
	name: string | null;
	text: string | null;
	legalidades: string | null;
	types: string | null;
}

function Deck(props: Deckprops) {
	const { status, setStatus, filters } = props;

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
		Name,
		Text,
		Legalidades,
		Types,
	}: FilterState = filters;

	const dispatch = useDispatch();
	const [cards, setCards] = useState<CardData[]>([]);
	const [page, setPage] = useState<number>(1);
	const [refresh] = useState<boolean>(false);
	const [hiddenCardIndex, setHiddenCardIndex] = useState<Set<number>>(
		new Set()
	);

	const gone = useState<Set<number>>(new Set())[0];

	const [propis, api] = useSprings(cards.length, (i) => ({
		...to(i),
		from: from(i),
	}));

	const fetchCards = async () => {
		try {
			setStatus("Loading");

			const letrasComb = obtenerLetras(filters);
			const rarityFilter: string | null = obtenerRarity(filters);
			let url = "https://api.magicthegathering.io/v1/cards?";

			const params: paramsInterface = {
				colorIdentity: letrasComb ? letrasComb : null,
				page: page,
				pageSize: 10,
				rarity: rarityFilter ? rarityFilter : null,
				name: Name ? Name : null,
				text: Text ? Text : null,
				types: Types ? Types : null,
				legalidades: Legalidades ? Legalidades : null,
			};

			params.page = page;

			const response = await axios.get(url, { params });
			console.log("response", response);
			setCards(response.data.cards);
			setStatus("Cargado");
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setPage(1);
		setTimeout(() => {
			gone.clear();
			api.start((i) => to(i));
		}, 600);
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
		filters,
	]);

	useEffect(() => {
		fetchCards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		setPage(1);
		gone.clear();
		api.start((i) => to(i));
		fetchCards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	/* const buscarObjeto = () => {
		const objeto = cards[current].foreignNames.find((objeto: any) => {
			if (objeto.language === "Spanish") {
				return objeto;
			}
			return false;
		});
		return objeto;
	}; */

	const handleAddStore = ({
		name,
		imageUrl,
		id,
		manaCost,
		originalType,
		rarity,
		types,
		subtypes,
		originalText,
	}: CardData) => {
		dispatch(
			cardAddOne({
				name,
				imageUrl,
				id,
				manaCost,
				originalType,
				rarity,
				types,
				subtypes,
				originalText,
			})
		);
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

				const x = isGone
					? (200 + window.innerWidth) * dir
					: down
					? mx
					: 0;
				const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
				const scale = down ? 1.1 : 1;

				//* Si pasa a la derecha lo añade a la store
				console.log("cards[index]", x);
				if (x >= window.innerWidth && isGone) {
					handleAddStore(cards[index]);
					/* 	setTimeout(() => {
						setHiddenCardIndex((prevSet) =>
						new Set(prevSet).add(index)
					);
					}, 500); // Retraso de 500ms antes de ocultar la carta */
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
				if (index === 0) {
					setPage((prevPage) => prevPage + 1);
				}
				setTimeout(() => {
					gone.clear();
					api.start((i) => to(i));
				}, 600);
			}
		}
	);

	return status === "Loading" ? (
		<Loading />
	) : (
		<>
			{cards.length > 0 && (
				<Fragment>
					<div className="deck">
						{propis.map(({ x, y, rot, scale }, index: number) => (
							<animated.div
								className={`cardContainer ${
									hiddenCardIndex.has(index) ? "hide" : ""
								}`}
								key={index}
								style={{
									x,
									y,
								}}
								{...bind(index)}
							>
								<div
									className={`card ${
										hiddenCardIndex.has(index) ? "hide" : ""
									}`}
									style={{
										backgroundImage: `url(${
											cards[index].imageUrl
												? cards[index].imageUrl
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
