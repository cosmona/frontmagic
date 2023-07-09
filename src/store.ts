import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";

interface UserState {
	user: any; // Ajusta el tipo de usuario según tus necesidades
}

interface Mazo {
	id: number;
	// Propiedades del mazo
}

interface Card {
	name: string;
	imageUrl: string;
	id: string;
	// Propiedades de la carta
}

interface CardViewState {
	Cards: Card[];
	ID: number | null;
}

const userSlice = createSlice({
	name: "user",
	initialState: null as UserState | null,
	reducers: {
		userLogin: (state, action: PayloadAction<UserState>) => action.payload,
		userLogout: (state, action) => null,
	},
});

export const { userLogin, userLogout } = userSlice.actions;

const mazoSlize = createSlice({
	name: "mazos",
	initialState: [] as Mazo[],
	reducers: {
		mazoListAdd: (state, action: PayloadAction<Mazo[]>) => {
			const nuevoObjeto = action.payload;
			nuevoObjeto.map((item) => state.push(item));
		},

		mazoAddOne: (state, action: PayloadAction<Mazo>) => {
			const nuevoObjeto = action.payload;
			state.push(nuevoObjeto);
		},

		mazoRemove: (state, action: PayloadAction<number>) => {
			const IDMazo = action.payload;
		},
		mazoRemoveAll: (state) => {
			state.length = 0; // Borra todos los elementos del estado
		},
	},
});

export const { mazoListAdd, mazoRemove, mazoRemoveAll, mazoAddOne } =
	mazoSlize.actions;

interface CardViewState {
	Cards: Card[];
	IDMazo: number | null;
}

const cardViewSlize = createSlice({
	name: "cardview",
	initialState: [] as unknown as CardViewState,
	reducers: {
		cardAddOne: (state, action: PayloadAction<Card>) => {
			const nuevaCarta = action.payload;
			state.Cards.push(nuevaCarta);
		},

		cardRemove: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			console.log("state.Cards.length", state.Cards.length);
			if (index >= 0 && index < state.Cards.length) {
				state.Cards.splice(index, 1);
			}
		},

		idMazoAdd: (
			state,
			action: PayloadAction<{ IDMazo: number; Cards: Card[] }>
		) => {
			const { IDMazo, Cards } = action.payload;
			const newState = { Cards, IDMazo: IDMazo };
			state.Cards = newState.Cards; // Asignar Cards directamente
			state.IDMazo = newState.IDMazo; // Asignar IDMazo directamente
		},

		cardAdd: (
			state,
			action: PayloadAction<{ IDMazo: number; Cards: Card[] }>
		) => {
			const { Cards, IDMazo } = action.payload;
			state.IDMazo = IDMazo;
			state.Cards = Cards;
		},

		cardRemoveAll: (state) => {
			state.Cards.length = 0;
			state.IDMazo = null;
		},
	},
});

export const { cardAdd, cardRemoveAll, cardAddOne, idMazoAdd, cardRemove } =
	cardViewSlize.actions;

interface RootState {
	user: UserState | null;
	mazos: Mazo[];
	cardview: CardViewState;
}

const option = {
	states: ["user", "mazos", "cardview"],
};

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		mazos: mazoSlize.reducer,
		cardview: cardViewSlize.reducer,
	},
	preloadedState: load(option),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(save(option)),
});
export default store;
