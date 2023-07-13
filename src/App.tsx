import Header from "./Header/Header";
import React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ModalLogin from "./Login/ModalLogin";
import Cartas from "./Components/Cartas/Cartas";
import Filtros from "./Components/Filtros/Filtros";
import MazoConstructor from "./Components/MazoConstructor/MazoConstructor";
import Mazos from "./Components/Mazos/Mazos";
import Deck from "./Components/Cartas/Deck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowsUpDown,
	faCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";
interface FilterState {
	ColorRed: boolean;
	ColorBlack: boolean;
	ColorGreen: boolean;
	ColorWhite: boolean;
	ColorBlue: boolean;
	Common: boolean;
	Uncommon: boolean;
	Rare: boolean;
	Mythic: boolean;
}
function App() {
	const [showLogin, setShowLogin] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const [status, setStatus] = useState("");
	const mazo = useSelector((state: any) => state.cardview); // Actualizamos mazo directamente usando useSelector
	const mazos = useSelector((state: any) => state.mazos); // Actualizamos mazo directamente usando useSelector
	const [scrollDirection, setScrollDirection] = React.useState("down");

	const [filters, setFilters] = useState({
		ColorRed: false,
		ColorBlack: false,
		ColorGreen: false,
		ColorWhite: false,
		ColorBlue: false,
		Common: false,
		Uncommon: false,
		Rare: false,
		Mythic: false,
	});

	useEffect(() => {
		console.log("filtersAPP", filters);
	}, [mazo, filters]);
	useEffect(() => {}, [mazos]);
	const handleDownUp = () => {
		console.log("scrollDirection", scrollDirection);
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
	};

	return (
		<div className="App">
			<Header setShowLogin={setShowLogin} />
			<section className="Filtros">
				<Filtros filters={filters} setFilters={setFilters} />
			</section>
			<section>
				<Mazos mazos={mazos} />
			</section>
			<section className="View">
				<Deck status={status} setStatus={setStatus} filters={filters} />
			</section>
			<div className="downIcon" onClick={() => handleDownUp()}>
				<FontAwesomeIcon icon={faArrowsUpDown} size="lg" />
			</div>
			<section>
				<MazoConstructor mazo={mazo} />
			</section>
			{
				/* <Filtros filters={filters} setFilters={setFilters} />
			<section className="View">
				<Deck status={status} setStatus={setStatus} filters={filters} />
			</section>
			<section>
				<Mazos mazos={mazos} />
			</section>
			<section>
				<MazoConstructor mazo={mazo} />
			</section>*/

				<ModalLogin show={showLogin} setShowLogin={setShowLogin} />
			}
		</div>
	);
}

export default App;
