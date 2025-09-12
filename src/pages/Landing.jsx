import React, { useEffect, useState } from "react";
import {
	Custominput,
	Errormodal,
	Loadingmodal,
	Successmodal,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
	loginAdmin,
	resetLogin,
	selectLoginSlice,
} from "../features/loginSlice";
import { styles } from "../style";

const Landing = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({ email: "", password: "" });
	const [showPass, setShowPass] = useState(false);
	const [error, setError] = useState("");

	const { token, loginLoading, loginError } = useSelector(selectLoginSlice);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		for (const key in form) {
			if (form[key] === "") {
				setError(`${key[0].toUpperCase()}${key.slice(1)} required!`);
				return;
			}
		}
		console.log(form);
		dispatch(loginAdmin(form));
	};

	useEffect(() => {
		if (loginError) {
			setError(loginError);
		}
	}, [loginError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetLogin());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		let timeout;
		if (token) {
			timeout = setTimeout(() => {
				dispatch(resetLogin());
				window.location.href = "/dashboard";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [token]);

	return (
		<section
			className={`${styles.section} ${styles.color.background} flex flex-col md:items-center md:justify-center h-screen`}
		>
			<form
				onSubmit={handleSubmit}
				className={`${styles.color.card} p-4 md:w-[400px] flex flex-col gap-6 md:p-8 h-full md:h-auto`}
			>
				<div>
					<h3 className={`${styles.font.heading} ${styles.color.text}`}>
						welcome back!
					</h3>
					<h6 className={`${styles.font.subheading} ${styles.color.text}`}>
						sign in to continue.
					</h6>
				</div>
				<div>
					<Custominput
						label={"email"}
						value={form.email}
						handleChange={handleChange}
						name={"email"}
						type={"text"}
					/>
					<Custominput
						label={"password"}
						value={form.password}
						handleChange={handleChange}
						name={"password"}
						type={showPass ? "text" : "password"}
					/>
				</div>
				<button
					type="submit"
					className={`${styles.color.button.primary} ${styles.font.text} px-5 py-2.5 rounded-lg font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
				>
					{"Sign In"}
				</button>
			</form>

			{error && (
				<Errormodal
					error={error}
					onClose={() => {
						dispatch(resetLogin());
						setError("");
					}}
				/>
			)}

			{token && (
				<Successmodal
					successText={"Login success"}
					onClose={() => dispatch(resetLogin())}
				/>
			)}
			{loginLoading && <Loadingmodal text={"Logging in..."} />}
		</section>
	);
};

export default Landing;
