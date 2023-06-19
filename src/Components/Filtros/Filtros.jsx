function Filtros({ filters, setFilters }) {
	return (
		<div>
			<form>
				<label>Filtros</label>
				<input
					type="checkbox"
					name="Rojo"
					id="R"
					onChange={() =>
						setFilters((prevFilters) => {
							// Crear una copia del estado anterior
							const newFilters = [...prevFilters];

							// Modificar el elemento específico
							newFilters[0].ColorRed = true;

							// Devolver el nuevo estado actualizado
							return newFilters;
						})
					}
				/>
				Rojo
				<input
					type="checkbox"
					name="Negro"
					id="B"
					onChange={() =>
						setFilters((prevFilters) => {
							// Crear una copia del estado anterior
							const newFilters = [...prevFilters];

							// Modificar el elemento específico
							newFilters[0].ColorBlack = true;

							// Devolver el nuevo estado actualizado
							return newFilters;
						})
					}
				/>
				Negro
				<input
					type="checkbox"
					name="Verde"
					id="G"
					onChange={() =>
						setFilters((prevFilters) => {
							// Crear una copia del estado anterior
							const newFilters = [...prevFilters];

							// Modificar el elemento específico
							newFilters[0].ColorGreen = true;

							// Devolver el nuevo estado actualizado
							return newFilters;
						})
					}
				/>{" "}
				Verde
				<input
					type="checkbox"
					name="Blanco"
					id="W"
					onChange={() =>
						setFilters((prevFilters) => {
							// Crear una copia del estado anterior
							const newFilters = [...prevFilters];

							// Modificar el elemento específico
							newFilters[0].ColorWhite = true;

							// Devolver el nuevo estado actualizado
							return newFilters;
						})
					}
				/>{" "}
				Blanco
				<input
					type="checkbox"
					name="Azul"
					id="U"
					onChange={() =>
						setFilters((prevFilters) => {
							// Crear una copia del estado anterior
							const newFilters = [...prevFilters];

							// Modificar el elemento específico
							newFilters[0].ColorBlue = true;

							// Devolver el nuevo estado actualizado
							return newFilters;
						})
					}
				/>{" "}
				Azul
			</form>
		</div>
	);
}

export default Filtros;
