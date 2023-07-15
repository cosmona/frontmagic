import React from "react";
import Common from "../../Media/Common.png";
import Uncommon from "../../Media/Uncommon.png";
import Rare from "../../Media/Rare.png";
import Mythic from "../../Media/Mythic.png";
import { FilterState } from "../../Helpers/Interfaces";

interface Componente1Props {
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
	menu: boolean;
}
const Rarity: React.FC<Componente1Props> = ({ filters, setFilters, menu }) => (
	<div className={menu ? "raritySection" : "raritySection hide"}>
		<div className="rarity-content">
			<img
				className={filters.Common ? "rarity border" : "rarity"}
				src={Common}
				alt="Common"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						Common: !prevFilters.Common,
					}))
				}
			/>
			<img
				className={filters.Uncommon ? "rarity border" : "rarity"}
				src={Uncommon}
				alt="Uncommon"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						Uncommon: !prevFilters.Uncommon,
					}))
				}
			/>
			<img
				className={filters.Rare ? "rarity border" : "rarity"}
				src={Rare}
				alt="Rare"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						Rare: !prevFilters.Rare,
					}))
				}
			/>
			<img
				className={filters.Mythic ? "rarity border" : "rarity"}
				src={Mythic}
				alt="Mythic"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						Mythic: !prevFilters.Mythic,
					}))
				}
			/>
		</div>
	</div>
);
export default Rarity;
