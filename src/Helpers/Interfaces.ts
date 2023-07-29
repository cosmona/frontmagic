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

export interface CardViewState {
	Cards: CardData[];
	IDMazo: number | null;
	FrontPage: string | null;
}

export interface paramsInterface {
	colorIdentity: string | null;
	page: number;
	pageSize: number;
	rarity: string | null;
	name: string | null;
	text: string | null;
	legalidades: string | null;
	types: string | null;
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

export interface MazosState {
	ID: number | any;
	NameMazo: string;
	User: number;
	FrontPage: string | null;
}

export interface Option {
	key: string;
	text: string;
	value: string;
}
