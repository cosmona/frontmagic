import React, { useState } from "react";
import ColorRed from "../../Media/ColorRed.png";
import ColorBlack from "../../Media/ColorBlack.png";
import ColorGreen from "../../Media/ColorGreen.png";
import ColorWhite from "../../Media/ColorWhite.png";
import ColorBlue from "../../Media/ColorBlue.png";

import redMana from "../../Media/redMana.png";
import blueMana from "../../Media/BlueMana.png";
import blackMana from "../../Media/blackMana.png";
import whiteMana from "../../Media/whiteMana.png";
import greenMana from "../../Media/greenMana.png";
import { FiltrosProps } from "../../Helpers/Interfaces";
import { Icon } from "semantic-ui-react";
import { ImageGenerator } from "../../Helpers/Helpers";

import "./IdentityColor.css";

const NormalColorFilter: React.FC<FiltrosProps> = ({ filters, setFilters }) => {
	return (
		<div className="IdentityColor">
			<ImageGenerator
				field={"ColorRed"}
				img={ColorRed}
				filters={filters}
				setFilters={setFilters}
				clase="iconFiltros"
			/>
			<ImageGenerator
				field={"ColorBlack"}
				img={ColorBlack}
				filters={filters}
				setFilters={setFilters}
				clase="iconFiltros"
			/>
			<ImageGenerator
				field={"ColorGreen"}
				img={ColorGreen}
				filters={filters}
				setFilters={setFilters}
				clase="iconFiltros"
			/>
			<ImageGenerator
				field={"ColorWhite"}
				img={ColorWhite}
				filters={filters}
				setFilters={setFilters}
				clase="iconFiltros"
			/>
			<ImageGenerator
				field={"ColorBlue"}
				img={ColorBlue}
				filters={filters}
				setFilters={setFilters}
				clase="iconFiltros"
			/>
		</div>
	);
};
const AvancedColorFilter: React.FC<FiltrosProps> = ({
	filters,
	setFilters,
}) => (
	<div>
		<div className="IdentityColor">
			<ImageGenerator
				field={"ColorRed"}
				img={redMana}
				filters={filters}
				setFilters={setFilters}
				clase="iconLitle"
			/>
			<ImageGenerator
				field={"ColorBlack"}
				img={blackMana}
				filters={filters}
				setFilters={setFilters}
				clase="iconLitle"
			/>
			<ImageGenerator
				field={"ColorGreen"}
				img={greenMana}
				filters={filters}
				setFilters={setFilters}
				clase="iconLitle"
			/>
			<ImageGenerator
				field={"ColorWhite"}
				img={whiteMana}
				filters={filters}
				setFilters={setFilters}
				clase="iconLitle"
			/>
			<ImageGenerator
				field={"ColorBlue"}
				img={blueMana}
				filters={filters}
				setFilters={setFilters}
				clase="iconLitle"
			/>
		</div>
	</div>
);

const IdentityColor: React.FC<FiltrosProps> = ({ filters, setFilters }) => {
	const [activeComponent, setActiveComponent] = useState(1);

	const handleNext = () => {
		setActiveComponent((prev) => (prev === 1 ? 2 : 1));
	};

	return (
		<div className="wrapperIdentityColor">
			<Icon circular name="angle left" onClick={handleNext} />
			{activeComponent === 1 && (
				<NormalColorFilter filters={filters} setFilters={setFilters} />
			)}
			{activeComponent === 2 && (
				<AvancedColorFilter filters={filters} setFilters={setFilters} />
			)}
			<Icon circular name="angle right" onClick={handleNext} />
		</div>
	);
};

export default IdentityColor;
