import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Landing />} />
			</Routes>
		</div>
	);
};

export default App;
