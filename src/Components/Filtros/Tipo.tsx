import React, { SyntheticEvent, useEffect, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";

import { loadImage } from "../../Helpers/Helpers";

import { MenuFiltersSetFiltersProps } from "../../Helpers/PropsInterfaces";
import axios from "axios";
import { Option } from "../../Helpers/Interfaces";

const Tipo: React.FC<MenuFiltersSetFiltersProps> = (
	props
): React.JSX.Element => {
	const { menu, setFilters } = props;
	const [options, setOptions] = useState<Option[]>([]);

	//*fetchTypes
	const fetchTypes = async () => {
		const url = "https://api.magicthegathering.io/v1/types";
		const response = await axios.get(url);
		const types = response.data.types;
		console.log("types", types);
		const arrObjetos = types.map((elemento: any) => ({
			key: elemento,
			text: elemento,
			value: elemento,
		}));

		setOptions(arrObjetos);
	};

	useEffect(() => {
		fetchTypes();
		console.log("options", options);
	}, []);

	console.log("options2", options);
	return (
		<div className={menu ? "TipoFilter" : "TipoFilter hide"}>
			<Form.Group widths="equal">
				<Dropdown
					onChange={(event: SyntheticEvent, data: any) => {
						setFilters((prevFilters) => ({
							...prevFilters,
							Types: data.value,
						}));
					}}
					clearable
					fluid
					options={options}
					placeholder="Tipo"
					selection
				/>
			</Form.Group>
		</div>
	);
};
export default Tipo;
