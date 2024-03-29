import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

//* Imagenes
import ColorRed from "../../Media/redMana.png";
import ColorBlue from "../../Media/BlueMana.png";
import ColorBlack from "../../Media/blackMana.png";
import ColorWhite from "../../Media/whiteMana.png";
import ColorGreen from "../../Media/greenMana.png";

import Common from "../../Media/Common.png";
import Uncommon from "../../Media/Uncommon.png";
import Rare from "../../Media/Rare.png";
import Mythic from "../../Media/Mythic.png";

//* Interfaces
import { MenuFiltersSetFiltersProps } from "../../Helpers/PropsInterfaces";
//* Css
import "./Filtros.css";

const FilterStatusBar: React.FC<MenuFiltersSetFiltersProps> = (
	props
): React.JSX.Element => {
	const { filters, menu, setMenu } = props;
	const [typeImage, setTypeImage] = useState<string | undefined>(undefined);
	const [LegalImage, setLegalImage] = useState<string | undefined>(undefined);

	useEffect(() => {
		//? Si cambia el tipo o la legalidad guarda la nueva imagen
		if (filters.Types) {
			import(`../../Media/${filters.Types}.svg`)
				.then((image) => image.default)
				.then((imageUrl) => setTypeImage(imageUrl));
		} else {
			setTypeImage(undefined);
		}
		if (filters.Legalidades) {
			import(`../../Media/${filters.Legalidades}.svg`)
				.then((image) => image.default)
				.then((imageUrl) => setLegalImage(imageUrl));
		} else {
			setLegalImage(undefined);
		}
	}, [filters.Types, filters.Legalidades]);

	return (
		<div
			className="desplegable"
			onClick={() => setMenu && setMenu((prevMenu: any) => !prevMenu)}
		>
			<div className="menuTextIcons">
				{filters.Text && `Text: ${filters.Text}`}
				{filters.Name && `Name: ${filters.Name}`}
			</div>

			<div className="menuManaIcons">
				{filters.ColorRed && (
					<img className="iconLitle" src={ColorRed} alt="ColorRed" />
				)}
				{filters.ColorBlue && (
					<img
						className="iconLitle"
						src={ColorBlue}
						alt="ColorBlue"
					/>
				)}
				{filters.ColorBlack && (
					<img
						className="iconLitle"
						src={ColorBlack}
						alt="ColorBlack"
					/>
				)}
				{filters.ColorWhite && (
					<img
						className="iconLitle"
						src={ColorWhite}
						alt="ColorWhite"
					/>
				)}
				{filters.ColorGreen && (
					<img
						className="iconLitle"
						src={ColorGreen}
						alt="ColorGreen"
					/>
				)}
			</div>

			<div className="menuRarityIcon">
				{filters.Common && (
					<img className="iconLitle" src={Common} alt="Common" />
				)}
				{filters.Uncommon && (
					<img className="iconLitle" src={Uncommon} alt="Uncommon" />
				)}
				{filters.Rare && (
					<img className="iconLitle" src={Rare} alt="Rare" />
				)}
				{filters.Mythic && (
					<img className="iconLitle" src={Mythic} alt="Mythic" />
				)}
			</div>

			<div className="menuTypesIcon">
				{filters.Types && (
					<img
						className="iconLitle"
						src={typeImage}
						alt={filters.Types}
					/>
				)}
			</div>

			<div className="menuLegacyIcon">
				{filters.Legalidades && (
					<img
						className="iconLitle"
						src={LegalImage}
						alt={filters.Legalidades}
					/>
				)}
			</div>

			<div className="filterIcon">
				Filtros{" "}
				{menu ? (
					<Icon name="sort amount up" />
				) : (
					<Icon name="sort amount down" />
				)}
			</div>
		</div>
	);
};

export default FilterStatusBar;
