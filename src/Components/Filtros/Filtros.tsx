import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDownWideShort,
	faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

// Registra el icono en el contexto de FontAwesome
import ColorRed from "../../Media/ColorRed.png";
import ColorBlack from "../../Media/ColorBlack.png";
import ColorGreen from "../../Media/ColorGreen.png";
import ColorWhite from "../../Media/ColorWhite.png";
import ColorBlue from "../../Media/ColorBlue.png";
import Common from "../../Media/Common.png";
import Uncommon from "../../Media/Common.png";
import Rare from "../../Media/Common.png";
import Mythic from "../../Media/Common.png";
import "./Filtros.css";

interface FilterState {
	ColorRed: boolean;
	ColorBlack: boolean;
	ColorGreen: boolean;
	ColorWhite: boolean;
	ColorBlue: boolean;
	Common: boolean;
	Uncommon: boolean;
	Rare: boolean;
	Mythic: boolean;
}

interface FiltrosProps {
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Filtros = (props: FiltrosProps) => {
	const { filters, setFilters } = props;
	const [menu, setMenu] = useState<boolean>(false);

	useEffect(() => {
		console.log("filters", filters);
	}, [filters]);
	return (
		<div>
			<form>
				<div className="IdentityColor">
					<img
						className={filters.ColorRed ? "icon border" : "icon"}
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
						className={filters.ColorBlack ? "icon border" : "icon"}
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
						className={filters.ColorGreen ? "icon border" : "icon"}
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
						className={filters.ColorWhite ? "icon border" : "icon"}
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
						className={filters.ColorBlue ? "icon border" : "icon"}
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
				<div className={menu ? "raritySection" : "raritySection hide"}>
					<div className="rarityTitle">Rarity:</div>
					<div className="rarity-content">
						<img
							className={
								filters.Common ? "rarity border" : "rarity"
							}
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
							className={
								filters.Uncommon ? "rarity border" : "rarity"
							}
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
							className={
								filters.Rare ? "rarity border" : "rarity"
							}
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
							className={
								filters.Mythic ? "rarity border" : "rarity"
							}
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
			</form>
			<div
				className="desplegable"
				onClick={() => setMenu((prevMenu) => !prevMenu)}
			>
				Filtros
				<div className="filterIcon">
					{menu ? (
						<FontAwesomeIcon icon={faArrowUpWideShort} />
					) : (
						<FontAwesomeIcon icon={faArrowDownWideShort} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Filtros;
