import React from "react";
import Common from "../../Media/Common.png";
import Uncommon from "../../Media/Uncommon.png";
import Rare from "../../Media/Rare.png";
import Mythic from "../../Media/Mythic.png";
import { MenuFiltersSetFiltersProps } from "../../Helpers/PropsInterfaces";
import { ImageGenerator } from "../../Helpers/Helpers";

const Rarity: React.FC<MenuFiltersSetFiltersProps> = (
	props
): React.JSX.Element => {
	const { filters, setFilters, menu } = props;

	return (
		<div className={menu ? "raritySection" : "raritySection hide"}>
			<div className="rarity-content">
				<ImageGenerator
					field={"Common"}
					img={Common}
					filters={filters}
					setFilters={setFilters}
					clase="rarity"
				/>
				<ImageGenerator
					field={"Uncommon"}
					img={Uncommon}
					filters={filters}
					setFilters={setFilters}
					clase="rarity"
				/>
				<ImageGenerator
					field={"Rare"}
					img={Rare}
					filters={filters}
					setFilters={setFilters}
					clase="rarity"
				/>
				<ImageGenerator
					field={"Mythic"}
					img={Mythic}
					filters={filters}
					setFilters={setFilters}
					clase="rarity"
				/>
			</div>
		</div>
	);
};
export default Rarity;
