import "./ModalLogin.css";

function MagicModal(props) {
	const { title, show } = props;

	return (
		<div className={`MagicModalContainer${show ? "Show" : "Hidden"}`}>
			<div>{title}</div>
			{props.children}
		</div>
	);
}
export default MagicModal;
