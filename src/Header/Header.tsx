import React from "react";
import NavbarLoginSignup from "../Login/NavbarLoginSignup";
import { useDispatch, useSelector } from "react-redux";
import { LoginSignupProps } from "../Helpers/Interfaces";

import "./Header.css";
import { LogOut } from "../Helpers/Helpers";

function Header(props: LoginSignupProps): React.JSX.Element {
	const { setShowLogin } = props;
	const user = useSelector((state: any) => state.user);
	const dispatch = useDispatch();

	return (
		<header className="App-header">
			{!user ? (
				<NavbarLoginSignup setShowLogin={setShowLogin} />
			) : (
				<div className="LogOut" onClick={() => LogOut(dispatch)}>
					LogOut
				</div>
			)}
		</header>
	);
}

export default Header;
