import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	darkMode: localStorage.getItem("theme") === "dark",
	toggle: false,
};

const navSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		setToggle(state) {
			state.toggle = !state.toggle;
		},
		setDarkMode(state) {
			state.darkMode = !state.darkMode;
			if (state.darkMode) {
				localStorage.setItem("theme", "dark");
				document.documentElement.classList.add("dark");
			} else {
				localStorage.setItem("theme", "light");
				document.documentElement.classList.remove("dark");
			}
		},
	},
});

export const selectNavSlice = (state) => state.nav;
export const { setToggle, setDarkMode } = navSlice.actions;
export default navSlice.reducer;
