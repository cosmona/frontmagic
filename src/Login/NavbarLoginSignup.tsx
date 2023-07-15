import React from "react";

import "./NavbarLoginSignup.css";

interface LoginSignupProps {
	setShowLogin: (show: boolean) => void;
}

function NavbarLoginSignup(props: LoginSignupProps) {
	const { setShowLogin } = props;

	const handleClickLogin = () => {
		setShowLogin(true);
		console.log("true");
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
