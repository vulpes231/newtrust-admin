import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	darkMode: localStorage.getItem("theme") === "dark",
	toggle: false,
	activeLink: localStorage.getItem("activeLink") || "dashboard",
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
		setActiveLink(state, payload) {
			state.activeLink = payload.payload;
			localStorage.setItem("activeLink", payload.payload);
		},
	},
});

export const selectNavSlice = (state) => state.nav;
export const { setToggle, setDarkMode, setActiveLink } = navSlice.actions;
export default navSlice.reducer;
