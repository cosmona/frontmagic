import MagicNavbar from "../Navbar/Navbar";
import "./Header.css";

function Header(props) {
	const { setShowLogin, setShowSignUp } = props;

	return (
		<header className="App-header">
			<MagicNavbar
				setShowLogin={setShowLogin}
				setShowSignUp={setShowSignUp}
			/>
		</header>
	);
}

export default Header;
