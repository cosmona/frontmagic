import React from "react";
import "./AddButtons.css";
import { useDispatch } from "react-redux";
import { cardAddOne } from "../../store";

interface Card {
	name: string;
	imageUrl: string;
	id: string;
	manaCost: string;
	originalType: string;
	rarity: string;
	originalText: string;
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
	manaCost: string,
	originalType: string,
	types: [],
	subtypes: [],
	originalText: string,
	dispatch: any
): void => {
	dispatch(
		cardAddOne({
			name,
			imageUrl,
			id,
			manaCost,
			originalType,
			rarity: "",
			types: [],
			subtypes: [],
			originalText,
		})
	);
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
							carta.manaCost,
							carta.originalType,
							carta.types,
							carta.subtypes,
							carta.originalText,
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
