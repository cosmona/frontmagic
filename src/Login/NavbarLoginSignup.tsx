import React from "react";
import { LoginSignupProps } from "../Helpers/PropsInterfaces";

import "./NavbarLoginSignup.css";

function NavbarLoginSignup(props: LoginSignupProps) {
	const { setShowLogin } = props;

	const handleClickLogin = () => {
		setShowLogin(true);
	};

	const handleClickSignUp = () => {};

	return (
		<div className="NavbarLoginSignup">
			<div className="Login" onClick={() => handleClickLogin()}>
				Login
			</div>
			<div className="SignUp" onClick={() => handleClickSignUp()}>
				SingUp
			</div>
		</div>
	);
}

export default NavbarLoginSignup;
