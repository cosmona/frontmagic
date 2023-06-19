import "./App.css";
import Header from "./Header/Header";
import { useState } from "react";
import ModalLogin from "./Login/ModalLogin";
import Cartas from "./Components/Cartas/Cartas";
import Filtros from "./Components/Filtros/Filtros";
import MazoConstructor from "./Components/MazoConstructor/MazoConstructor";
import Mazos from "./Components/Mazos/Mazos";

function App() {
	const [showLogin, setShowLogin] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);

	const [filters, setFilters] = useState([
		{
			ColorRed: false,
			ColorBlack: false,
			ColorGreen: false,
			ColorWhite: false,
			ColorBlue: false,
		},
	]);

	return (
		<div className="App">
			<Header setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
			<Filtros filters={filters} setFilters={setFilters} />
			<section className="View">
				<Cartas filters={filters} />
			</section>
			<section>
				<Mazos />
			</section>
			<section>
				<MazoConstructor />
			</section>
			<ModalLogin show={showLogin} setShowLogin={setShowLogin} />
		</div>
	);
}

export default App;
