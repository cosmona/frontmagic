import "./AddButtons.css";
import { useDispatch } from "react-redux";
import { cardAddOne } from "../../store";

const handleAddStore = (name, imageUrl, id, dispatch) => {
	dispatch(cardAddOne({ name, imageUrl, id }));
};

function AddButtons({ current, setCurrent, setPage, page, carta }) {
	const dispatch = useDispatch();

	return (
		<>
			<form className="form">
				<div
					onClick={() => {
						handleAddStore(
							carta.name,
							carta.imageUrl,
							carta.id,
							dispatch
						);
					}}
				>
					Añadir
				</div>
			</form>
		</>
	);
}

export default AddButtons;
