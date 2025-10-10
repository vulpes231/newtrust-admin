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
	{ id: "savings", name: "savings" },
	{ id: "plans", name: "plans" },
	// { id: "settings", name: "settings" },
	{ id: "verifications", name: "verifications" },
];

const userMenuLinks = [
	{ id: "profile", name: "admin profile" },
	{ id: "settings", name: "app settings" },
];

const supportedCoins = [
	{ id: "btc", title: "btc", network: ["btc"] },
	{ id: "eth", title: "eth", network: ["erc20"] },
	{ id: "usdt", title: "usdt", network: ["erc20", "trc20"] },
	{ id: "bank", title: "bank", network: ["bank"] },
];

const handleFormChange = (e, form, handleForm) => {
	const { name, value } = e.target;
	handleForm({ ...form, [name]: value });
};

export {
	devServer,
	getAccessToken,
	liveServer,
	sideBarLinks,
	handleFormChange,
	supportedCoins,
	userMenuLinks,
};
