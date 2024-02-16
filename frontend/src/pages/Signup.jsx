import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-1/4">
    <div className="bg-gray-900 p-12 rounded-lg ">
      <div className="header flex justify-center ">
        <h1 className="text-2xl font-bold">Craete Your Account </h1>
      </div>
      <div className="content mt-6">
        <form action="">
          <div className="form__input ">
            <label htmlFor="username" className="text-xl font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Jhon Doe"
              className="logininput"
            />
          </div>
          <div className="form__input ">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="jhondoe001@gmail.com"
              className="logininput"
            />
          </div>
          <div className="form__input ">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="logininput" />
          </div>
          <div className="form__input ">
            <label htmlFor="confirmpassword">Password</label>
            <input
              type="password"
              name="confirmpassword"
              className="logininput"
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
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
