import { CardViewState, FilterState, MazosState } from "./Interfaces";

//* Login
export interface LoginSignupProps {
	setShowLogin: (show: boolean) => void;
}

export interface NavbarLoginSignupProps {
	setShowLogin: (show: boolean) => void;
	show: boolean;
}

export interface MagicModalProps {
	title: string;
	show: boolean;
	children: React.ReactNode;
}

//* Mazos
export interface MazosProps {
	mazos: MazosState[];
}

export interface MazoConstructorProps {
	cardView: CardViewState;
	menu: boolean;
	setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

//* Filtros
export interface MenuFiltersSetFiltersProps {
	menu?: boolean;
	setMenu?: React.Dispatch<React.SetStateAction<boolean>>;
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

//* Deck
export interface Deckprops {
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	filters: FilterState;
}

//* ImageGenerator
export interface ImageGeneratorProps {
	field: string;
	img: string;
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
	clase: string;
}
