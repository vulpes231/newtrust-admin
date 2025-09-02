import React, { useEffect, useState } from "react";
import { Custominput, Errormodal } from "../components";
import { useDispatch } from "react-redux";
import { resetLogin } from "../features/loginSlice";

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
		<section className="p-6 flex flex-col md:items-center md:justify-center h-screen bg-white md:bg-slate-200">
			<form
				onSubmit={handleSubmit}
				className="bg-white md:w-[400px] flex flex-col gap-6 md:p-8 md:shadow-sm md:rounded-2xl"
			>
				<div>
					<h3>welcome back!</h3>
					<h6>sign in to continue.</h6>
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
					className="bg-black text-white h-[35px] w-full md:rounded-lg font-normal text-sm md:text-base capitalize"
				>
					{" "}
					sign in
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
