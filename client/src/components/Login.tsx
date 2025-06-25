import React, { useState } from "react";
import { useAuth } from "./useAuth";
import { Logo } from "../assets/Logo";

export const Login = () => {
  const { login, SetIsLogged } = useAuth(); // Proper destructuring
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // clear previous errors
    try {
      await login(form.email, form.password);
      if (SetIsLogged) SetIsLogged(true); // optional chaining in case not provided
    } catch (err: any) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="bg-gray-100 w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 p-10 bg-white w-[400px] rounded-2xl shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-4">
          {Logo(32, 32)}
          <span className="text-xl font-semibold text-gray-800">Second Brain</span>
        </div>

        <label htmlFor="email" className="w-full text-sm text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="w-full text-sm text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          Login
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};
