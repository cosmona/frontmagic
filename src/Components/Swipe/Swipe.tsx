import React from "react";
import "./Swipe.css";
import { handleNext, handleLast } from "../../Helpers/Helpers";

interface SwipeProps {
	imageUrl: string;
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
}

const Swipe: React.FC<SwipeProps> = ({
	imageUrl,
	current,
	setCurrent,
	setPage,
	page,
}: SwipeProps) => {
	return (
		<div className="Content">
			<div onClick={() => handleLast(current, setCurrent, setPage, page)}>
				&lt;
			</div>
			<img src={imageUrl} alt="Carta" className="cardImage" />
			<div onClick={() => handleNext(current, setCurrent, setPage, page)}>
				&gt;
			</div>
		</div>
	);
};

export default Swipe;
