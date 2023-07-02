function Filtros({ filters, setFilters }) {
	return (
		<div>
			<form>
				<input
					type="checkbox"
					name="Rojo"
					id="R"
					onChange={() =>
						setFilters((prevFilters) => {
							// Crear una nueva copia del estado anterior y actualizar ColorRed
							const newFilters = prevFilters.map((filter) => {
								return {
									...filter,
									ColorRed: !filter.ColorRed,
								};
							});

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
							// Crear una nueva copia del estado anterior y actualizar ColorRed
							const newFilters = prevFilters.map((filter) => {
								return {
									...filter,
									ColorBlack: !filter.ColorBlack,
								};
							});

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
							// Crear una nueva copia del estado anterior y actualizar ColorRed
							const newFilters = prevFilters.map((filter) => {
								return {
									...filter,
									ColorGreen: !filter.ColorGreen,
								};
							});

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
							// Crear una nueva copia del estado anterior y actualizar ColorRed
							const newFilters = prevFilters.map((filter) => {
								return {
									...filter,
									ColorWhite: !filter.ColorWhite,
								};
							});

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
							// Crear una nueva copia del estado anterior y actualizar ColorRed
							const newFilters = prevFilters.map((filter) => {
								return {
									...filter,
									ColorBlue: !filter.ColorBlue,
								};
							});

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
