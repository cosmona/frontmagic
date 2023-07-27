import React, { useEffect, useState } from "react";
import { Button, ButtonProps, Input, Select } from "semantic-ui-react";
import { MenuFiltersSetFiltersProps } from "../../Helpers/Interfaces";

const TextFilter: React.FC<MenuFiltersSetFiltersProps> = ({
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
	const handleSelectTextFilter = (
		item: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		data: ButtonProps
	) => {
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
				onClick={(item, data) => handleSelectTextFilter(item, data)}
			>
				Search
			</Button>
		</div>
	);
};
export default TextFilter;
