import React, { useState } from "react";
import { Button, Input, Select } from "semantic-ui-react";
import { MenuFiltersSetFiltersProps } from "../../Helpers/PropsInterfaces";
import { options } from "../../Helpers/Data";

const TextFilter: React.FC<MenuFiltersSetFiltersProps> = (props) => {
	const { menu, setFilters } = props;
	const [valor, setValor] = useState("");
	const [campo, setCampo] = useState("name");

	const handleSelectTextFilter = () => {
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
	};

	return (
		<div className={menu ? "TextFilter" : "TextFilter hide"}>
			<Input
				className="Text"
				onChange={(value: any) => setValor(value.target.value)}
				type="text"
				placeholder="Search..."
				action
			/>
			<Select
				className="SelectTextFilter"
				options={options}
				defaultValue={"name"}
				onChange={(item: any) => setCampo(item.target.innerText)}
			/>
			<Button
				className="buttonTextFilter"
				type="submit"
				onClick={handleSelectTextFilter}
			>
				Search
			</Button>
		</div>
	);
};
export default TextFilter;
