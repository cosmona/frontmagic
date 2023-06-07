import MagicNavbar from "../Navbar/Navbar";

function Header(props) {
	console.log("props", props);
	const { setShowLogin, setShowSignUp } = props;
	console.log("setShowLogin", setShowLogin);

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
