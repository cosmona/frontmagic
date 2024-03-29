import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import { CardData, Mazo, UserState, CardViewState } from "./Helpers/Interfaces";

const userSlice = createSlice({
	name: "user",
	initialState: null as UserState | null,
	reducers: {
		userLogin: (state, action: PayloadAction<UserState>) => action.payload,
		userLogout: (state) => null,
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

		mazoRemove: (state, action: PayloadAction<number | null>) => {
			const IDMazo = action.payload;
			// Filtrar los elementos y asignar el nuevo estado filtrado
			const index = state.findIndex((item) => item.ID === IDMazo);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},

		mazoRemoveAll: (state) => {
			state.length = 0; // Borra todos los elementos del estado
		},
	},
});

export const { mazoListAdd, mazoRemove, mazoRemoveAll, mazoAddOne } =
	mazoSlize.actions;

const cardViewSlize = createSlice({
	name: "cardview",
	initialState: { Cards: [], IDMazo: null, FrontPage: null } as CardViewState,
	reducers: {
		cardAddOne: (state, action: PayloadAction<CardData>) => {
			const nuevaCarta = action.payload;
			state.Cards.push(nuevaCarta);
		},

		cardRemove: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			if (index >= 0 && index < state.Cards.length) {
				state.Cards.splice(index, 1);
			}
		},

		idMazoAdd: (
			state,
			action: PayloadAction<{ IDMazo: number; Cards: CardData[] }>
		) => {
			const { IDMazo, Cards } = action.payload;
			const newState = { Cards, IDMazo: IDMazo };
			state.Cards = newState.Cards; // Asignar Cards directamente
			state.IDMazo = newState.IDMazo; // Asignar IDMazo directamente
		},

		cardAdd: (
			state,
			action: PayloadAction<{
				IDMazo: number;
				FrontPage: string;
				Cards: CardData[];
			}>
		) => {
			const { Cards, IDMazo, FrontPage } = action.payload;
			state.IDMazo = IDMazo;
			state.FrontPage = FrontPage;
			state.Cards = Cards;
		},

		cardRemoveAll: (state) => {
			state.Cards.length = 0;
			state.IDMazo = null;
			state.FrontPage = null;
		},
		cardFrontPageAdd: (state, action) => {
			state.FrontPage = action.payload;
		},
	},
});

export const {
	cardAdd,
	cardRemoveAll,
	cardAddOne,
	idMazoAdd,
	cardRemove,
	cardFrontPageAdd,
} = cardViewSlize.actions;

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
