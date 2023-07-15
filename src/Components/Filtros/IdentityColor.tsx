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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleChevronLeft,
	faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./IdentityColor.css";
import { FilterState } from "../../Helpers/Interfaces";

interface Componente1Props {
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Componente1: React.FC<Componente1Props> = ({ filters, setFilters }) => (
	<div className="IdentityColor">
		<img
			className={filters.ColorRed ? "iconFiltros border" : "iconFiltros"}
			src={ColorRed}
			alt="Rojo"
			onClick={() =>
				setFilters((prevFilters) => ({
					...prevFilters,
					ColorRed: !prevFilters.ColorRed,
				}))
			}
		/>
		<img
			className={
				filters.ColorBlack ? "iconFiltros border" : "iconFiltros"
			}
			src={ColorBlack}
			alt="Negro"
			onClick={() =>
				setFilters((prevFilters) => ({
					...prevFilters,
					ColorBlack: !prevFilters.ColorBlack,
				}))
			}
		/>
		<img
			className={
				filters.ColorGreen ? "iconFiltros border" : "iconFiltros"
			}
			src={ColorGreen}
			alt="Verde"
			onClick={() =>
				setFilters((prevFilters) => ({
					...prevFilters,
					ColorGreen: !prevFilters.ColorGreen,
				}))
			}
		/>
		<img
			className={
				filters.ColorWhite ? "iconFiltros border" : "iconFiltros"
			}
			src={ColorWhite}
			alt="Blanco"
			onClick={() =>
				setFilters((prevFilters) => ({
					...prevFilters,
					ColorWhite: !prevFilters.ColorWhite,
				}))
			}
		/>
		<img
			className={filters.ColorBlue ? "iconFiltros border" : "iconFiltros"}
			src={ColorBlue}
			alt="Azul"
			onClick={() =>
				setFilters((prevFilters) => ({
					...prevFilters,
					ColorBlue: !prevFilters.ColorBlue,
				}))
			}
		/>
	</div>
);

const Componente2: React.FC<Componente1Props> = ({ filters, setFilters }) => (
	<div>
		<div className="IdentityColor">
			<img
				className={filters.ColorRed ? "iconLitle border" : "iconLitle"}
				src={redMana}
				alt="Rojo"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						ColorRed: !prevFilters.ColorRed,
					}))
				}
			/>
			<img
				className={
					filters.ColorBlack ? "iconLitle border" : "iconLitle"
				}
				src={blackMana}
				alt="Negro"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						ColorBlack: !prevFilters.ColorBlack,
					}))
				}
			/>
			<img
				className={
					filters.ColorGreen ? "iconLitle border" : "iconLitle"
				}
				src={greenMana}
				alt="Verde"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						ColorGreen: !prevFilters.ColorGreen,
					}))
				}
			/>
			<img
				className={
					filters.ColorWhite ? "iconLitle border" : "iconLitle"
				}
				src={whiteMana}
				alt="Blanco"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						ColorWhite: !prevFilters.ColorWhite,
					}))
				}
			/>
			<img
				className={filters.ColorBlue ? "iconLitle border" : "iconLitle"}
				src={blueMana}
				alt="Azul"
				onClick={() =>
					setFilters((prevFilters) => ({
						...prevFilters,
						ColorBlue: !prevFilters.ColorBlue,
					}))
				}
			/>
		</div>
	</div>
);

const IdentityColor: React.FC<{
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}> = ({ filters, setFilters }) => {
	const [activeComponent, setActiveComponent] = useState(1);

	const handleNext = () => {
		setActiveComponent((prev) => (prev === 1 ? 2 : 1));
	};

	return (
		<div className="wrapperIdentityColor">
			<FontAwesomeIcon
				className="buttonNext"
				onClick={handleNext}
				icon={faCircleChevronLeft}
			/>
			{activeComponent === 1 && (
				<Componente1 filters={filters} setFilters={setFilters} />
			)}
			{activeComponent === 2 && (
				<Componente2 filters={filters} setFilters={setFilters} />
			)}
			<FontAwesomeIcon
				className="buttonNext"
				onClick={handleNext}
				icon={faCircleChevronRight}
			/>
		</div>
	);
};

export default IdentityColor;
