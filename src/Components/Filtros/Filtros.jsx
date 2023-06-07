function Filtros(props) {
	const {
		setColorRed,
		setColorBlack,
		setColorGreen,
		setColorWhite,
		setColorBlue,
	} = props;
	return (
		<div>
			<form>
				<label>Filtros</label>
				<input
					type="checkbox"
					name="Rojo"
					id="R"
					onChange={() => setColorRed(true)}
				/>
				Rojo
				<input
					type="checkbox"
					name="Negro"
					id="B"
					onChange={() => setColorBlack(true)}
				/>
				Negro
				<input
					type="checkbox"
					name="Verde"
					id="G"
					onChange={() => setColorGreen(true)}
				/>{" "}
				Verde
				<input
					type="checkbox"
					name="Blanco"
					id="W"
					onChange={() => setColorWhite(true)}
				/>{" "}
				Blanco
				<input
					type="checkbox"
					name="Azul"
					id="U"
					onChange={() => setColorBlue(true)}
				/>{" "}
				Azul
			</form>
		</div>
	);
}

export default Filtros;
