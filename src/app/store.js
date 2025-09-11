import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import manageUserReducer from "../features/manageUserSlice";
import navReducer from "../features/navSlice";

const store = configureStore({
	reducer: {
		login: loginReducer,
		manageuser: manageUserReducer,
		nav: navReducer,
	},
});

export default store;
