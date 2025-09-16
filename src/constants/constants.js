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
};
