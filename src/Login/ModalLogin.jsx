import MagicModal from "../Components/MagicModal";
import Login from "./Login";

function ModalLogin(props) {
	const { show, setShowLogin } = props;

	return (
		<MagicModal title="Inicio de sesion" show={show}>
			<Login setShowLogin={setShowLogin} />
		</MagicModal>
	);
}

export default ModalLogin;
