import React from "react";
import MagicModal from "../Components/MagicModal";
import Login from "./Login";

interface NavbarLoginSignupProps {
	setShowLogin: (show: boolean) => void;
	show: boolean;
}

function ModalLogin(props: NavbarLoginSignupProps): React.JSX.Element {
	const { show, setShowLogin } = props;

	console.log("show", show);
	return (
		<MagicModal title="Inicio de sesion" show={show}>
			<Login setShowLogin={setShowLogin} />
		</MagicModal>
	);
}

export default ModalLogin;
