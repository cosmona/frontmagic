import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardAdd, cardRemoveAll } from "../../store";

import { Icon } from "semantic-ui-react";

import { CardViewState } from "../../Helpers/Interfaces";
import { MazosProps } from "../../Helpers/PropsInterfaces";

import {
	FetchMazos,
	ImageComponent,
	handleFetchOneSavedMazos,
} from "../../Helpers/Helpers";

import "./Mazos.css";

const Mazos: React.FC<MazosProps> = (props): React.JSX.Element => {
	const { mazos } = props;
	const dispatch = useDispatch();
	const [cardView, setCardView] = useState<CardViewState | null>(null);
	const [menu, setMenu] = useState<boolean>(false);
	const IDMazo = useSelector((state: any) => state.cardview.IDMazo);
	const user = useSelector((state: any) => state.user);

	useEffect(() => {
		if (user) FetchMazos(dispatch);
	}, []);

	const handleLoadingMazo = async (IdMazo: number) => {
		dispatch(cardRemoveAll());
		const dataConIdMazo: any = await handleFetchOneSavedMazos(IdMazo);
		setCardView(dataConIdMazo);
		dispatch(cardAdd(dataConIdMazo));
	};

	return (
		<div>
			<div className="WrapperMazos">
				<div
					className="TitleMazos"
					onClick={() => setMenu((prevMenu) => !prevMenu)}
				>
					{mazos && mazos.length} Mazos
					<div className="filterIcon">
						{menu ? (
							<Icon name={"arrow alternate circle up outline"} />
						) : (
							<Icon
								name={"arrow alternate circle down outline"}
							/>
						)}
					</div>
				</div>
				<ul
					className={
						menu ? "desplegableMazos" : "desplegableMazos hide"
					}
				>
					{mazos &&
						mazos.map((mazo) => (
							<>
								<div
									className={
										mazo.ID === IDMazo
											? "Card Active"
											: "Card"
									}
									key={mazo.ID}
									onClick={() => handleLoadingMazo(mazo.ID)}
								>
									{/*TODO No renderiza esto bien cuando se salva un mazo */}
									{ImageComponent(mazo.FrontPage)}
									{mazo.ID}
								</div>
							</>
						))}
				</ul>
			</div>
		</div>
	);
};

export default Mazos;
