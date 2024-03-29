import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { signup, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    await signup(input);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-1/4">
      <div className="bg-gray-900 p-12 rounded-lg ">
        <div className="header flex justify-center ">
          <h1 className="text-2xl font-bold">Craete Your Account </h1>
        </div>
        <div className="content mt-6">
          <form onSubmit={handleSubmit}>
            <div className="form__input ">
              <label htmlFor="username" className="text-xl font-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Jhon Doe"
                className="logininput"
                value={input.username}
                onChange={handleChange}
              />
            </div>
            <div className="form__input ">
              <label htmlFor="email" className="text-xl font-semibold">
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="jhondoe001@gmail.com"
                className="logininput"
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <div className="form__input ">
              <label htmlFor="password" className="text-xl font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="logininput"
                value={input.password}
                onChange={handleChange}
              />
            </div>
            <div className="form__input ">
              <label
                htmlFor="confirmpassword"
                className="text-xl font-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                className="logininput"
                value={input.confirmpassword}
                onChange={handleChange}
              />
            </div>
            <div className="new-account mt-2">
              <p className="text-lg">
                {"Alredy "} have an account? &nbsp;
                <Link to="/login">
                  <span className="hover:underline text-violet-300 hover:text-blue-600 mt-2 inline-block">
                    Login
                  </span>
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="bg-violet-700 p-2 rounded-lg w-full font-semibold text-xl mt-4"
            >
              Create Account
              {loading ? <ClipLoader color="white" className="ml-2" /> : <></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
