import React from "react";

interface Filter {
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
	filters: Filter[];
	setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

const Filtros: React.FC<FiltrosProps> = ({
	filters,
	setFilters,
}: FiltrosProps) => {
	return (
		<div>
			<form>
				<input
					type="checkbox"
					name="Rojo"
					id="R"
					onChange={() =>
						setFilters((prevFilters) => {
							const newFilters = prevFilters.map((filter) => ({
								...filter,
								ColorRed: !filter.ColorRed,
							}));
							return newFilters;
						})
					}
				/>
				Rojo
				<input
					type="checkbox"
					name="Negro"
					id="B"
					onChange={() =>
						setFilters((prevFilters) => {
							const newFilters = prevFilters.map((filter) => ({
								...filter,
								ColorBlack: !filter.ColorBlack,
							}));
							return newFilters;
						})
					}
				/>
				Negro
				<input
					type="checkbox"
					name="Verde"
					id="G"
					onChange={() =>
						setFilters((prevFilters) => {
							const newFilters = prevFilters.map((filter) => ({
								...filter,
								ColorGreen: !filter.ColorGreen,
							}));
							return newFilters;
						})
					}
				/>{" "}
				Verde
				<input
					type="checkbox"
					name="Blanco"
					id="W"
					onChange={() =>
						setFilters((prevFilters) => {
							const newFilters = prevFilters.map((filter) => ({
								...filter,
								ColorWhite: !filter.ColorWhite,
							}));
							return newFilters;
						})
					}
				/>{" "}
				Blanco
				<input
					type="checkbox"
					name="Azul"
					id="U"
					onChange={() =>
						setFilters((prevFilters) => {
							const newFilters = prevFilters.map((filter) => ({
								...filter,
								ColorBlue: !filter.ColorBlue,
							}));
							return newFilters;
						})
					}
				/>{" "}
				Azul
			</form>
		</div>
	);
};

export default Filtros;
