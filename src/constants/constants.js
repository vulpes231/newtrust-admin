const devServer = "http://localhost:5000";
const liveServer = "https://";

const getAccessToken = () => {
	return sessionStorage.getItem("token") || null;
};

const sideBarLinks = [
	{ id: "dashboard", name: "dashboard" },
	{ id: "admins", name: "admins" },
	{ id: "users", name: "users" },
	{ id: "transactions", name: "transactions" },
	{ id: "positions", name: "positions" },
	{ id: "settings", name: "settings" },
	{ id: "profile", name: "profile" },
];

export { devServer, getAccessToken, liveServer, sideBarLinks };
