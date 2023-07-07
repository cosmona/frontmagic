import { configureStore, createSlice } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import produce from "immer";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		userLogin: (state, action) => action.payload,
		userLogout: (state, action) => null,
	},
});

export const { userLogin, userLogout } = userSlice.actions;

const mazoSlize = createSlice({
	name: "mazos",
	initialState: [],
	reducers: {
		mazoListAdd: (state, action) => {
			const nuevoObjeto = action.payload;
			nuevoObjeto.map((item) => state.push(item));
		},

		mazoAddOne: (state, action) => {
			const nuevoObjeto = action.payload;
			state.push(nuevoObjeto);
		},

		mazoRemove: (state, action) => {
			const IDMazo = action.payload;
		},
		mazoRemoveAll: (state) => {
			state.length = 0; // Borra todos los elementos del estado
		},
	},
});

export const { mazoListAdd, mazoRemove, mazoRemoveAll, mazoAddOne } =
	mazoSlize.actions;

const initialState = {
	Cards: [],
	IDMazo: null,
};

const cardViewSlize = createSlice({
	name: "cardview",
	initialState,
	reducers: {
		cardAddOne: (state, action) => {
			const nuevaCarta = action.payload;
			state.Cards.push(nuevaCarta);
		},

		cardRemove: (state, action) => {
			const index = action.payload;
			console.log("state.Cards.length", state.Cards.length);
			if (index >= 0 && index < state.Cards.length) {
				state.Cards.splice(index, 1);
			}
		},

		idMazoAdd: (state, action) => {
			const { idMazo, Cards } = action.payload;
			const newState = { Cards, IDMazo: idMazo };
			state.Cards = newState.Cards; // Asignar Cards directamente
			state.IDMazo = newState.IDMazo; // Asignar IDMazo directamente
		},

		cardAdd: (state, action) => {
			const { Cards, IDMazo } = action.payload;
			state.IDMazo = IDMazo;
			state.Cards = Cards;
		},

		cardRemoveAll: (state) => {
			state.Cards = [];
			state.IDMazo = null;
			state.length = 0; // Borra todos los elementos del estado
		},
	},
});

export const { cardAdd, cardRemoveAll, cardAddOne, idMazoAdd, cardRemove } =
	cardViewSlize.actions;

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
