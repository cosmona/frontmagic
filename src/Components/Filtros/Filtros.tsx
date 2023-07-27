import React, { useEffect, useState } from "react";

import { Form } from "semantic-ui-react";

import IdentityColor from "./IdentityColor";

import Rarity from "./Rarity";
import TextFilter from "./TextFilter";
import Tipo from "./Tipo";
import Legalidades from "./Legalidades";
import FilterStatusBar from "./FilterStatusBar";

import { FiltrosProps } from "../../Helpers/Interfaces";
import "./Filtros.css";

const Filtros = (props: FiltrosProps): React.JSX.Element => {
	const { filters, setFilters } = props;

	const [menu, setMenu] = useState<boolean>(false);
	useEffect(() => {}, [filters]);

	return (
		<>
			<IdentityColor filters={filters} setFilters={setFilters} />
			<Form>
				<div className="wrapperForm">
					<TextFilter
						menu={menu}
						filters={filters}
						setFilters={setFilters}
					/>
					<Tipo menu={menu} setFilters={setFilters} />
					<Legalidades menu={menu} setFilters={setFilters} />
					<Rarity
						filters={filters}
						setFilters={setFilters}
						menu={menu}
					/>
				</div>
			</Form>

			<FilterStatusBar filters={filters} menu={menu} setMenu={setMenu} />
		</>
	);
};

export default Filtros;
