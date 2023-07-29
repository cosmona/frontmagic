import React, { Fragment, useEffect, useState } from "react";

import { Form } from "semantic-ui-react";

import IdentityColor from "./IdentityColor";
import Rarity from "./Rarity";
import TextFilter from "./TextFilter";
import Tipo from "./Tipo";
import Legalidades from "./Legalidades";
import FilterStatusBar from "./FilterStatusBar";

import { MenuFiltersSetFiltersProps } from "../../Helpers/PropsInterfaces";
import "./Filtros.css";

const Filtros: React.FC<MenuFiltersSetFiltersProps> = (
	props
): React.JSX.Element => {
	const { filters, setFilters } = props;

	const [menu, setMenu] = useState<boolean>(false);
	useEffect(() => {}, [filters]);

	return (
		<Fragment>
			<Form>
				<IdentityColor
					menu={menu}
					filters={filters}
					setFilters={setFilters}
				/>

				<div className="wrapperForm">
					<TextFilter
						menu={menu}
						filters={filters}
						setFilters={setFilters}
					/>
					<Tipo
						filters={filters}
						menu={menu}
						setFilters={setFilters}
					/>
					<Legalidades
						menu={menu}
						filters={filters}
						setFilters={setFilters}
					/>
					<Rarity
						filters={filters}
						setFilters={setFilters}
						menu={menu}
					/>
				</div>
			</Form>

			<FilterStatusBar
				filters={filters}
				menu={menu}
				setMenu={setMenu}
				setFilters={setFilters}
			/>
		</Fragment>
	);
};

export default Filtros;
