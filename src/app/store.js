import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import manageUserReducer from "../features/manageUserSlice";
import navReducer from "../features/navSlice";
import manageTrnxReducer from "../features/manageTrnxSlice";
import adminReducer from "../features/adminSlice";
import positionReducer from "../features/positionSlice";

const store = configureStore({
	reducer: {
		nav: navReducer,
		login: loginReducer,
		admin: adminReducer,
		manageuser: manageUserReducer,
		managetrnx: manageTrnxReducer,
		position: positionReducer,
	},
});

export default store;
