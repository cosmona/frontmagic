import React, { SyntheticEvent } from "react";
import { Dropdown, Form } from "semantic-ui-react";

import { MenuSetFiltersProps } from "../../Helpers/Interfaces";
import { legalities } from "../../Helpers/Data";

const Legalidades = ({ menu, setFilters }: MenuSetFiltersProps) => {
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
