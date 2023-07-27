export interface FilterState {
	ColorRed: boolean;
	ColorBlack: boolean;
	ColorGreen: boolean;
	ColorWhite: boolean;
	ColorBlue: boolean;
	Common: boolean;
	Uncommon: boolean;
	Rare: boolean;
	Mythic: boolean;
	Name: string | null;
	Text: string | null;
	Legalidades: string | null;
	Types: string | null;
	[key: string]: boolean | string | null; // Firma de índice
}

export interface TypeFilter {
	[key: string]: boolean | string | null; // Firma de índice
}

export interface CardData {
	name: string;
	imageUrl: string;
	id: string;
	manaCost: string;
	originalType: string;
	rarity: string | null;
	types: [];
	subtypes: [];
	originalText: string;
}

export interface User {
	status: string | null;
	message: string | null;
	data: [] | null;
}

export interface UserState {
	user: User | null; // Ajusta el tipo de usuario según tus necesidades
}

export interface Mazo {
	ID: number;
	// Propiedades del mazo
}

export interface CardViewState {
	Cards: CardData[];
	IDMazo: number | null;
	FrontPage: string | null;
}

export interface RootState {
	user: UserState | null;
	mazos: Mazo[];
	cardview: CardViewState;
}

export interface LoginSignupProps {
	setShowLogin: (show: boolean) => void;
}

export interface FiltrosProps {
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export interface MenuFiltersSetFiltersProps {
	menu: boolean;
	filters: FilterState;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export interface MenuSetFiltersProps {
	menu: boolean;
	setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export interface MenuFiltrosProps {
	menu: boolean;
	filters: FilterState;
	setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MazosState {
	ID: number | any;
	NameMazo: string;
	User: number;
	FrontPage: string | null;
}
export interface MazosProps {
	mazos: MazosState[];
}
