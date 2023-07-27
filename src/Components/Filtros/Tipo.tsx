import React, { SyntheticEvent, useEffect, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";

import { MenuSetFiltersProps, TypeFilter } from "../../Helpers/Interfaces";
import axios from "axios";
import { loadImage } from "../../Helpers/Helpers";

const Tipo = ({ menu, setFilters }: MenuSetFiltersProps) => {
	interface Option {
		key: string;
		text: string;
		value: string;
		image: {
			avatar: boolean;
			src: string;
		};
	}

	const [options, setOptions] = useState<Option[]>([]);
	//*fetchTypes
	const fetchTypes = async () => {
		const url = "https://api.magicthegathering.io/v1/types";
		const response = await axios.get(url);
		const types = response.data.types;
	};

	useEffect(() => {
		fetchTypes();
		console.log("options", options);
	}, []);

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
