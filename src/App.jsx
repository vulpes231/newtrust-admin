import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Landing } from "./pages";
import { getAccessToken } from "./constants/constants";

const App = () => {
	const token = getAccessToken();

	return (
		<div>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/dashboard"
					element={token ? <Dashboard /> : <Landing />}
				/>
			</Routes>
		</div>
	);
};

export default App;
