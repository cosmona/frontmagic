import React from "react";
import MagicModal from "../Components/MagicModal";
import Login from "./Login";
import { NavbarLoginSignupProps } from "../Helpers/PropsInterfaces";

function ModalLogin(props: NavbarLoginSignupProps): React.JSX.Element {
	const { show, setShowLogin } = props;

	return (
		<MagicModal title="Inicio de sesion" show={show}>
			<Login setShowLogin={setShowLogin} />
		</MagicModal>
	);
}

export default ModalLogin;
