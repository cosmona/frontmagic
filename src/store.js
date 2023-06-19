import { configureStore, createSlice } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import { composeWithDevTools } from "redux-devtools-extension";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		userLogin: (state, action) => action.payload,
		userLogout: (state, action) => null,
	},
});

const mazoSlize = createSlice({
	name: "mazo",
	initialState: [],
	reducers: {
		mazoAdd: (state, action) => {
			const { ID, NameMazo, User } = action.payload;
			const nuevoObjeto = { ID, NameMazo, User };
			state.push(nuevoObjeto);
		},

		mazoRemove: (state, action) => {
			const index = action.payload;
			if (index >= 0 && index < state.length) {
				state.splice(index, 1);
			}
		},
		mazoRemoveAll: (state) => {
			state.length = 0; // Borra todos los elementos del estado
		},
	},
});
export const { mazoAdd, mazoRemove, mazoRemoveAll } = mazoSlize.actions;
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
		idMazoAdd: (state, action) => {
			const { idMazo, Cards } = action.payload;
			const newState = { Cards, IDMazo: idMazo };
			state.Cards = newState.Cards; // Asignar Cards directamente
			state.IDMazo = newState.IDMazo; // Asignar IDMazo directamente
		},
		cardAdd: (state, action) => {
			const { Cards, IDMazo } = action.payload;
			console.log("IDMazo", IDMazo);
			console.log("Cards", Cards);

			if (Cards.length !== 0) {
				const nuevosObjetos = Cards.map((item) => {
					const { ID, IDcarta, IDmazo, Name, ImageURL } = item;
					return { ID, IDcarta, IDmazo, Name, ImageURL };
				});

				const newState = { ...nuevosObjetos, ...{ IDMazo: IDMazo } };
				state.push(newState);
			} else {
				const newState = { IDMazo: IDMazo };
				state.push(newState);
			}
		},
		cardRemoveAll: (state) => {
			console.log("state", state);
			state.Cards = [];
			state.IDMazo = null;
			state.length = 0; // Borra todos los elementos del estado
		},
	},
});
export const { cardAdd, cardRemoveAll, cardAddOne, idMazoAdd } =
	cardViewSlize.actions;

export const { userLogin, userLogout } = userSlice.actions;

const option = {
	states: ["user", "mazo", "cardview"],
};
const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		mazo: mazoSlize.reducer,
		cardview: cardViewSlize.reducer,
	},
	preloadedState: load(option),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(save(option)),
});
export default store;
