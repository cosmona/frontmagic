import React, { SyntheticEvent } from "react";
import { Dropdown, Form } from "semantic-ui-react";

import Commander from "../../Media/Commander.png";
import Duel from "../../Media/Duels.svg";
import Legacy from "../../Media/Legacy.svg";
import Modern from "../../Media/Legacy.svg";
import Oathbreaker from "../../Media/Oathbreaker.png";
import Pauper from "../../Media/Legacy.svg";
import Paupercomander from "../../Media/Legacy.svg";
import Penny from "../../Media/Legacy.svg";
import Predh from "../../Media/Legacy.svg";
import Premodern from "../../Media/Legacy.svg";
import Vintage from "../../Media/Legacy.svg";
import { FilterState } from "../../Helpers/Interfaces";

interface LegalidadesProps {
	menu: boolean;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Legalidades = ({ menu, setFilters }: LegalidadesProps) => {
	const legalities = [
		{
			key: "Commander",
			text: "Commander",
			value: "Commander",
			image: {
				avatar: true,
				src: Commander,
			},
		},
		{
			key: "Duel",
			text: "Duel",
			value: "Duel",
			image: {
				avatar: true,
				src: Duel,
			},
		},
		{
			key: "Legacy",
			text: "Legacy",
			value: "Legacy",
			image: {
				avatar: true,
				src: Legacy,
			},
		},
		{
			key: "Modern",
			text: "Modern",
			value: "Modern",
			image: {
				avatar: true,
				src: Modern,
			},
		},
		{
			key: "Oathbreaker",
			text: "Oathbreaker",
			value: "Oathbreaker",
			image: {
				avatar: true,
				src: Oathbreaker,
			},
		},
		{
			key: "Pauper",
			text: "Pauper",
			value: "Pauper",
			image: {
				avatar: true,
				src: Pauper,
			},
		},
		{
			key: "Paupercommander",
			text: "Paupercommander",
			value: "Paupercommander",
			image: {
				avatar: true,
				src: Paupercomander,
			},
		},
		{
			key: "Penny",
			text: "Penny",
			value: "Penny",
			image: {
				avatar: true,
				src: Penny,
			},
		},
		{
			key: "Predh",
			text: "Predh",
			value: "Predh",
			image: {
				avatar: true,
				src: Predh,
			},
		},
		{
			key: "Premodern",
			text: "Premodern",
			value: "Premodern",
			image: {
				avatar: true,
				src: Premodern,
			},
		},
		{
			key: "Vintage",
			text: "Vintage",
			value: "Vintage",
			image: {
				avatar: true,
				src: Vintage,
			},
		},
	];

	return (
		<div className={menu ? "LegalFilter" : "LegalFilter hide"}>
			<Form.Group widths="equal">
				<Dropdown
					fluid
					className="icon"
					clearable
					options={legalities}
					onChange={(event: SyntheticEvent, data: any) => {
						setFilters((prevFilters) => ({
							...prevFilters,
							Legalidades: data.value,
						}));
					}}
					placeholder="Legalidades"
					selection
				/>
			</Form.Group>
		</div>
	);
};
export default Legalidades;
