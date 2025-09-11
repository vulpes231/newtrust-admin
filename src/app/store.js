import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import manageUserReducer from "../features/manageUserSlice";

const store = configureStore({
	reducer: {
		login: loginReducer,
		manageuser: manageUserReducer,
	},
});

export default store;
