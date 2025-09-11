import React, { useEffect, useState } from "react";
import { Custominput, Errormodal } from "../components";
import { useDispatch } from "react-redux";
import { resetLogin } from "../features/loginSlice";
import { styles } from "../style";

const Landing = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({ username: "", password: "" });
	const [showPass, setShowPass] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		for (const key in form) {
			if (form[key] === "") {
				setError(`${key} required!`);
				return;
			}
		}
		console.log(form);
	};

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetLogin());
				setError("");
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

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
						label={"username"}
						value={form.username}
						handleChange={handleChange}
						name={"username"}
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
					error={"Hello"}
					onClose={() => {
						dispatch(resetLogin());
						setError("");
					}}
				/>
			)}
		</section>
	);
};

export default Landing;
