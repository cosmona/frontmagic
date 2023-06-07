import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Cartas(props) {
	const { ColorRed, ColorBlack, ColorGreen, ColorWhite, ColorBlue } =
		props.filters;
	const [cards, setCards] = useState([]);
	const [page, setPage] = useState(1);
	const containerRef = useRef(null);
	let colorIdentity;
	useEffect(() => {
		setCards([]);
		setPage(1);
	}, [ColorBlack, ColorBlue, ColorGreen, ColorRed, ColorWhite]);
	useEffect(() => {
		const fetchCards = async () => {
			try {
				if (ColorRed) {
					colorIdentity = "R";
				}
				if (ColorBlack) {
					colorIdentity = "B";
				}
				if (ColorGreen) {
					colorIdentity = "G";
				}
				if (ColorWhite) {
					colorIdentity = "W";
				}
				if (ColorBlue) {
					colorIdentity = "U";
				}
				if (
					!ColorBlack &&
					!ColorBlue &&
					!ColorGreen &&
					!ColorRed &&
					!ColorWhite
				) {
					colorIdentity = null;
				}
				const response = await axios.get(
					`https://api.magicthegathering.io/v1/cards`,
					{
						params: {
							page: page,
							pageSize: 10,
							colorIdentity: colorIdentity ? colorIdentity : "",
						},
					}
				);
				setCards((prevCards) => [...prevCards, ...response.data.cards]);
				console.log("response", response.data.cards);
			} catch (error) {
				console.error(error);
			}
		};

		const handleScroll = () => {
			const { scrollTop, clientHeight, scrollHeight } =
				containerRef.current;
			if (scrollTop + clientHeight >= scrollHeight - 100) {
				setPage((prevPage) => prevPage + 1);
			}
		};

		fetchCards();

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [page, ColorRed, ColorBlack, ColorGreen, ColorWhite, ColorBlue]);

	return (
		<div ref={containerRef}>
			{cards.map((card) => (
				<div>
					{card.foreignNames &&
						card.foreignNames.map((item, index) => {
							if (item.language === "Spanish") {
								console.log("item", item);
								return (
									<>
										<div>{item.name}</div>
										<img src={item.imageUrl} alt={index} />
									</>
								);
							}
						})}
				</div>
			))}
		</div>
	);
}

export default Cartas;
