import React, { useEffect, useState } from "react";

import { Form } from "semantic-ui-react";

import IdentityColor from "./IdentityColor";

import Rarity from "./Rarity";
import TextFilter from "./TextFilter";
import Tipo from "./Tipo";
import Legalidades from "./Legalidades";
import FilterStatusBar from "./FilterStatusBar";

import "./Filtros.css";
import { FilterState } from "../../Helpers/Interfaces";

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
		<>
			<IdentityColor filters={filters} setFilters={setFilters} />
			<Form>
				<div className="wrapperForm">
					<Rarity
						filters={filters}
						setFilters={setFilters}
						menu={menu}
					/>
					<TextFilter
						menu={menu}
						filters={filters}
						setFilters={setFilters}
					/>
					<Tipo menu={menu} setFilters={setFilters} />
					<Legalidades menu={menu} setFilters={setFilters} />
				</div>
			</Form>

			<FilterStatusBar filters={filters} menu={menu} setMenu={setMenu} />
		</>
	);
};

export default Filtros;
