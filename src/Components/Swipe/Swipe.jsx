import "./Swipe.css";
import { handleNext } from "../../Helpers/Helpers";
import { handleLast } from "../../Helpers/Helpers";
function Swipe({ imageUrl, current, setCurrent, setPage, page }) {
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
}

export default Swipe;
