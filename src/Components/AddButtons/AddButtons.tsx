import React from "react";
import "./AddButtons.css";
import { useDispatch } from "react-redux";
import { cardAddOne } from "../../store";

interface Card {
	name: string;
	imageUrl: string;
	id: string;
}

interface AddButtonsProps {
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	carta: any;
}

const handleAddStore = (
	name: string,
	imageUrl: string,
	id: string,
	dispatch: any
): void => {
	dispatch(cardAddOne({ name, imageUrl, id }));
};

function AddButtons({
	current,
	setCurrent,
	setPage,
	page,
	carta,
}: AddButtonsProps): JSX.Element {
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
