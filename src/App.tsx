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

import { FilterState } from "./Helpers/Interfaces";
import "./App.css";

function App() {
	const [showLogin, setShowLogin] = useState(false);
	/* const [showSignUp, setShowSignUp] = useState(false); */
	const [status, setStatus] = useState("");
	const cardView = useSelector((state: any) => state.cardview);
	const mazos = useSelector((state: any) => state.mazos);

	const [filters, setFilters] = useState<FilterState>({
		ColorRed: false,
		ColorBlack: false,
		ColorGreen: false,
		ColorWhite: false,
		ColorBlue: false,
		Common: false,
		Uncommon: false,
		Rare: false,
		Mythic: false,
		Name: null,
		Text: null,
		Legalidades: null,
		Types: null,
	});

	useEffect(() => {}, [cardView]);
	useEffect(() => {}, [mazos]);
	useEffect(() => {}, [showLogin]);

	return (
		<div className="App">
			<Header setShowLogin={setShowLogin} />
			<Filtros filters={filters} setFilters={setFilters} />
			<Mazos mazos={mazos} />
			{/* <Cartas filters={filters} setFilters={setFilters} /> */}
			<section className="View">
				<Deck status={status} setStatus={setStatus} filters={filters} />
			</section>
			<MazoConstructor cardView={cardView} />
			<ModalLogin show={showLogin} setShowLogin={setShowLogin} />
		</div>
	);
}

export default App;
