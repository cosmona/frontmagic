import React, { Fragment } from "react";
import NavbarLoginSignup from "../Login/NavbarLoginSignup";
import { useSelector } from "react-redux";

interface NavbarLoginSignupProps {
	setShowLogin: (show: boolean) => void;
}

function MagicNavbar(props: NavbarLoginSignupProps): JSX.Element {
	const { setShowLogin } = props;
	const user = useSelector((state: any) => state.user);

	return (
		<Fragment>
			{!user && <NavbarLoginSignup setShowLogin={setShowLogin} />}
		</Fragment>
	);
}

export default MagicNavbar;
