import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "semantic-ui-react";
import { FilterState } from "../../Helpers/Interfaces";

interface Componente1Props {
	menu: boolean;
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}
const TextFilter: React.FC<Componente1Props> = ({
	menu,
	filters,
	setFilters,
}) => {
	const [valor, setValor] = useState("");
	const [campo, setCampo] = useState("name");

	const options = [
		{ key: "name", text: "name", value: "name" },
		{ key: "text", text: "text", value: "text" },
	];

	return (
		<div className={menu ? "TextFilter" : "TextFilter hide"}>
			<Input
				className="Text"
				onChange={(value: any) => setValor(value.target.value)}
				type="text"
				placeholder="Search..."
				action
			>
				<input />
				<Select
					className="SelectTextFilter"
					options={options}
					defaultValue={"name"}
					onChange={(item: any) => setCampo(item.target.innerText)}
				/>
				<Button
					className="buttonTextFilter"
					type="submit"
					onClick={(item, data) => {
						if (campo === "name")
							setFilters((prevFilters: any) => ({
								...prevFilters,
								Name: `${valor}`,
								Text: null,
							}));
						if (campo === "text")
							setFilters((prevFilters: any) => ({
								...prevFilters,
								Name: null,
								Text: `${valor}`,
							}));
					}}
				>
					Search
				</Button>
			</Input>
		</div>
	);
};
export default TextFilter;
