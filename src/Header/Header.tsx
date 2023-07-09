import React from "react";

import MagicNavbar from "../Navbar/Navbar";
import "./Header.css";

interface NavbarLoginSignupProps {
	setShowLogin: (show: boolean) => void;
}

function Header(props: NavbarLoginSignupProps): React.JSX.Element {
	const { setShowLogin } = props;

	return (
		<header className="App-header">
			<MagicNavbar setShowLogin={setShowLogin} />
		</header>
	);
}

export default Header;
