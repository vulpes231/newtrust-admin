import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Landing } from "./pages";
import { getAccessToken } from "./constants/constants";
import { useSelector } from "react-redux";
import { selectNavSlice } from "./features/navSlice";
import { Navbar } from "./components";

const App = () => {
	const token = getAccessToken();

	const { darkMode } = useSelector(selectNavSlice);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [darkMode]);

	return (
		<div>
			{token && <Navbar />}
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route
					path="/dashboard"
					element={!token ? <Dashboard /> : <Landing />}
				/>
			</Routes>
		</div>
	);
};

export default App;
