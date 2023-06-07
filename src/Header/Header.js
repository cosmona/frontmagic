import MagicNavbar from "../Navbar/Navbar";

function Header(props) {
	const { setShowLogin, setShowSignUp } = props;

	return (
		<>
			<MagicNavbar
				setShowLogin={setShowLogin}
				setShowSignUp={setShowSignUp}
			/>
		</>
	);
}

export default Header;
