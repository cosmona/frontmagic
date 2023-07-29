import React, { SyntheticEvent } from "react";
import { Dropdown, Form } from "semantic-ui-react";

import { MenuFiltersSetFiltersProps } from "../../Helpers/PropsInterfaces";
import { legalities } from "../../Helpers/Data";

const Legalidades: React.FC<MenuFiltersSetFiltersProps> = (
	props
): React.JSX.Element => {
	const { menu, setFilters } = props;
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
