import React from "react";

import "./ModalLogin.css";
import { MagicModalProps } from "../Helpers/PropsInterfaces";

function MagicModal(props: MagicModalProps): React.JSX.Element {
	const { title, show } = props;

	return (
		<div className={`MagicModalContainer${show ? "Show" : "Hidden"}`}>
			<div>{title}</div>
			{props.children}
		</div>
	);
}
export default MagicModal;
