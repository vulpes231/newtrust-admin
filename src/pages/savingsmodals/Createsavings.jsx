import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Custominput } from "../../components";
import { handleFormChange } from "../../constants/constants";
import { LucideX } from "lucide-react";
import { createSavings, searchCountries } from "../../services/savingService";
import { useDebounce } from "use-debounce";

const Createsavings = ({ onClose }) => {
	const [form, setForm] = useState({
		name: "",
		title: "",
		note: [""],
		interestRate: "",
		minDeposit: "",
		maxDeposit: "",
		minWithdrawal: "",
		maxWithdrawal: "",
		eligibleCountries: [],
	});

	const [error, setError] = useState("");
	const [countryValue, setCountryValue] = useState("");
	const [selectedCountries, setSelectedCountries] = useState([]);
	const [debouncedCountryValue] = useDebounce(countryValue, 300);

	const {
		data: countries = [],
		isLoading: countrySearchLoading,
		error: countrySearchError,
	} = useQuery({
		queryKey: ["searchCountries", debouncedCountryValue],
		queryFn: () => searchCountries(debouncedCountryValue),
		enabled: debouncedCountryValue.length > 2,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const mutation = useMutation({
		mutationFn: createSavings,
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => setError(error.message),
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!form.name.trim() || !form.title.trim()) {
			setError("Name and title are required");
			return;
		}

		const filteredNotes = form.note.filter((note) => note.trim() !== "");

		const submissionData = {
			...form,
			note: filteredNotes,
			eligibleCountries: selectedCountries.map((country) => country._id),
		};

		console.log("Submitting:", submissionData);
		mutation.mutate(submissionData);
	};

	const handleNoteChange = (index, value) => {
		const updatedNotes = [...form.note];
		updatedNotes[index] = value;
		setForm((prev) => ({ ...prev, note: updatedNotes }));
	};

	const addNoteField = () => {
		setForm((prev) => ({ ...prev, note: [...prev.note, ""] }));
	};

	const removeNoteField = (index) => {
		if (form.note.length > 1) {
			const updatedNotes = form.note.filter((_, i) => i !== index);
			setForm((prev) => ({ ...prev, note: updatedNotes }));
		}
	};

	const handleCountrySelect = (country) => {
		if (!selectedCountries.find((c) => c._id === country._id)) {
			setSelectedCountries((prev) => [...prev, country]);
			setCountryValue("");
		}
	};

	const removeCountry = (countryId) => {
		setSelectedCountries((prev) =>
			prev.filter((country) => country._id !== countryId)
		);
	};

	const handleInputChange = (e) => {
		handleFormChange(e, form, setForm);
	};

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				mutation.reset();
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error, mutation]);

	useEffect(() => {
		let timeout;
		if (mutation.isSuccess) {
			timeout = setTimeout(() => {
				mutation.reset();
				onClose();
				window.location.reload();
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [mutation.isSuccess, onClose, mutation]);

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[90vh]">
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 sticky top-0">
					<div>
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Create Savings Account
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							Add a new savings account
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
					>
						<LucideX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
							{error}
						</div>
					)}

					{/* Success Message */}
					{mutation.isSuccess && (
						<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
							Account created successfully!
						</div>
					)}

					<Custominput
						value={form.name}
						handleChange={handleInputChange}
						name={"name"}
						label={"Account Name"}
						type={"text"}
						required
					/>

					<Custominput
						value={form.title}
						handleChange={handleInputChange}
						name={"title"}
						label={"Account Title"}
						type={"text"}
						required
					/>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Notes {form.note.length > 1 && `(${form.note.length})`}
						</label>
						{form.note.map((note, index) => (
							<div key={index} className="flex gap-2">
								<input
									type="text"
									value={note}
									onChange={(e) => handleNoteChange(index, e.target.value)}
									className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
									placeholder={`Note ${index + 1}`}
								/>
								{form.note.length > 1 && (
									<button
										type="button"
										onClick={() => removeNoteField(index)}
										className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
									>
										<LucideX className="w-4 h-4" />
									</button>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={addNoteField}
							className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
						>
							+ Add Another Note
						</button>
					</div>

					<Custominput
						value={form.interestRate}
						handleChange={handleInputChange}
						name={"interestRate"}
						label={"Interest Rate (%)"}
						type={"number"}
						step="0.01"
					/>

					<Custominput
						value={form.minDeposit}
						handleChange={handleInputChange}
						name={"minDeposit"}
						label={"Minimum Deposit"}
						type={"number"}
					/>

					<Custominput
						value={form.maxDeposit}
						handleChange={handleInputChange}
						name={"maxDeposit"}
						label={"Maximum Deposit"}
						type={"number"}
					/>

					<Custominput
						value={form.minWithdrawal}
						handleChange={handleInputChange}
						name={"minWithdrawal"}
						label={"Minimum Withdrawal"}
						type={"number"}
					/>

					<Custominput
						value={form.maxWithdrawal}
						handleChange={handleInputChange}
						name={"maxWithdrawal"}
						label={"Maximum Withdrawal"}
						type={"number"}
					/>

					{/* Eligible Countries Section - Array of Country IDs */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Eligible Countries{" "}
							{selectedCountries.length > 0 &&
								`(${selectedCountries.length} selected)`}
						</label>

						{/* Selected Countries */}
						{selectedCountries.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-2">
								{selectedCountries.map((country) => (
									<span
										key={country.id}
										className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm"
									>
										{country.name}
										<button
											type="button"
											onClick={() => removeCountry(country.id)}
											className="hover:text-indigo-600 dark:hover:text-indigo-400"
										>
											<LucideX className="w-3 h-3" />
										</button>
									</span>
								))}
							</div>
						)}

						{/* Country Search */}
						<div className="relative">
							<input
								type="text"
								value={countryValue}
								onChange={(e) => setCountryValue(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
								placeholder="Search countries..."
							/>

							{/* Search Results */}
							{countryValue.length > 2 && countries.length > 0 && (
								<div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
									{countries.map((country) => (
										<button
											type="button"
											key={country._id}
											onClick={() => handleCountrySelect(country)}
											className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
										>
											{country.name}
										</button>
									))}
								</div>
							)}

							{countrySearchLoading && (
								<div className="absolute right-3 top-2.5">
									<div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
								</div>
							)}
						</div>
					</div>

					<button
						type="submit"
						disabled={mutation.isPending}
						className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg mt-6"
					>
						{mutation.isPending ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Creating Account...
							</>
						) : (
							<>Create Account</>
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Createsavings;
