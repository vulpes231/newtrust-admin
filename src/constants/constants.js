const devServer = "http://localhost:6000";
const liveServer = "https://";

const getAccessToken = () => {
	return sessionStorage.getItem("token") || null;
};

export { devServer, getAccessToken, liveServer };
