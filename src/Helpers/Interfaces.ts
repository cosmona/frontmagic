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

export interface UserState {
	user: any; // Ajusta el tipo de usuario según tus necesidades
}
