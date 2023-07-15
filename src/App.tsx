import Header from "./Header/Header";
import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalLogin from "./Login/ModalLogin";
import Cartas from "./Components/Cartas/Cartas";
import Filtros from "./Components/Filtros/Filtros";
import MazoConstructor from "./Components/MazoConstructor/MazoConstructor";
import Mazos from "./Components/Mazos/Mazos";
import Deck from "./Components/Cartas/Deck";

import "./App.css";
import { FilterState } from "./Helpers/Interfaces";
import { mazoListAdd, mazoRemoveAll } from "./store";

function App() {
	const [showLogin, setShowLogin] = useState(false);
	/* const [showSignUp, setShowSignUp] = useState(false); */
	const [status, setStatus] = useState("");
	const cardView = useSelector((state: any) => state.cardview); // Actualizamos mazo directamente usando useSelector
	const mazos = useSelector((state: any) => state.mazos); // Actualizamos mazo directamente usando useSelector

	const dispatch = useDispatch();

	let newData;

	try {
		newData = JSON.parse(
			localStorage.getItem("redux_localstorage_simple_user") || ""
		);
	} catch (error) {
		console.error("Error al analizar el JSON:", error);
	}

	let token: any;
	if (newData) {
		token = newData.data.token;
	}

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
			<section className="View">
				<Deck status={status} setStatus={setStatus} filters={filters} />
			</section>

			<MazoConstructor cardView={cardView} />
			<ModalLogin show={showLogin} setShowLogin={setShowLogin} />
		</div>
	);
}

export default App;
