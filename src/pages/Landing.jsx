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
import { motion } from "framer-motion";
import { card, dropIn, slideLeft } from "../style/variants";

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
      <motion.form
        variants={card}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className={`${styles.color.card} p-8 max-w-md w-full mx-auto flex flex-col gap-6 h-auto mt-[80px]`}
      >
        <div>
          <h3 className={`${styles.font.heading} ${styles.color.text}`}>
            Welcome back!
          </h3>
          <h6 className={`font-normal text-[#9f9f9f] text-md md:text-base`}>
            Sign in to continue.
          </h6>
        </div>
        <div className="flex flex-col gap-4">
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
          className={`bg-[#5156be] ${styles.font.text} px-5 py-2.5 rounded-lg font-medium md:font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#5156be] disabled:opacity-50 disabled:cursor-not-allowed mt-5 h-[48px] md:h-[49px] text-md md:text-base flex items-center justify-center text-white`}
        >
          {"Sign In"}
        </button>
      </motion.form>

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
