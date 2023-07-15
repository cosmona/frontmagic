import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";

import Nothing from "../../Media/Generic.svg";
import { FilterState } from "../../Helpers/Interfaces";

interface TipoProps {
	menu: boolean;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Tipo = ({ menu, setFilters }: TipoProps) => {
	const [options, setOptions] = useState([
		{ key: "ninguno", text: "Ninguno", value: "ninguno" },
	]);

	const fetchTypes = async () => {
		try {
			const url = "https://api.magicthegathering.io/v1/types";
			const response = await axios.get(url);
			const updatedOptions = response.data.types.map((type: string) => {
				const importPath = `../../Media/${type}.svg`;
				return import(importPath)
					.then((image) => ({
						key: type,
						text: type,
						value: type,
						image: {
							avatar: true,
							src: image.default, // Utiliza la URL de la imagen SVG
						},
					}))
					.catch((error) => {
						console.error(
							`Error al cargar la imagen ${type}:`,
							error
						);
						return {
							key: type,
							text: type,
							value: type,
							image: {
								avatar: true,
								src: Nothing,
							},
						};
					});
			});
			// Añadir la opción "ninguno" a la lista de opciones
			const noneOption = {
				key: "ninguno",
				text: "Ninguno",
				value: "ninguno",
				image: {
					avatar: true,
					src: Nothing,
				},
			};
			updatedOptions.unshift(Promise.resolve(noneOption));

			Promise.all(updatedOptions).then((resolvedOptions) => {
				const filteredOptions = resolvedOptions.filter(
					(option) => option !== null
				);
				setOptions(filteredOptions);
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchTypes();
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
