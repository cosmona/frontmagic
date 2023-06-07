import "./App.css";
import Header from "./Header/Header";
import { useState } from "react";
import ModalLogin from "./Login/ModalLogin";
import Cartas from "./Components/Cartas/Cartas";
import Filtros from "./Components/Filtros/Filtros";

function App() {
	const [showLogin, setShowLogin] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const [ColorRed, setColorRed] = useState(false);
	const [ColorBlack, setColorBlack] = useState(false);
	const [ColorGreen, setColorGreen] = useState(false);
	const [ColorWhite, setColorWhite] = useState(false);
	const [ColorBlue, setColorBlue] = useState(false);

	return (
		<div className="App">
			<header className="App-header">
				<Header
					setShowLogin={setShowLogin}
					setShowSignUp={setShowSignUp}
				/>
			</header>
			<Filtros
				setColorRed={setColorRed}
				setColorBlack={setColorBlack}
				setColorGreen={setColorGreen}
				setColorWhite={setColorWhite}
				setColorBlue={setColorBlue}
			/>
			<section className="View">
				<Cartas
					filters={{
						ColorRed,
						ColorBlack,
						ColorGreen,
						ColorWhite,
						ColorBlue,
					}}
				/>
			</section>
			<ModalLogin show={showLogin} setShowLogin={setShowLogin} />
		</div>
	);
}

export default App;
