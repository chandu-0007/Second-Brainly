import React, { useState } from "react";
import { Logo } from "../assets/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
 interface signInProps  {
  username : string , 
  age?:number,
  email:string ,
  password :string
 }
  const [form, setForm] = useState<signInProps>({ 
     username:"",
     email: "",
     password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 const goToLogin =()=>{
  navigate("/login");
 }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // clear previous errors
    try{
      if(!form.username || !form.email || !form.password){
        setError("Please fill all the required fields")
        alert("Please fill all the required fields")
        return ;
      }
        const res = await axios.post("https://second-brainly-8343.onrender.com/users/register",{
            username : form.username ,
            age:Number(form.age) ,
            email:form.email,
            password:form.password
        })
        const data = res.data ; 
        if(data.success){
           setError(data.message);
            goToLogin();
        }else{
            setError(data.message)
            setForm({
              username: "",
              age: undefined,
              email: "",
              password: ""
            })
        }
    }catch(errror){
        alert("Something went wrong , please try again later")
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
          
          <label htmlFor="username" className="w-full text-sm text-gray-700">username</label>
        <input
          id="username"
          type="username"
          name="username"
          placeholder="Enter your username"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.username}
          onChange={handleChange}
        /> 
         
         <label htmlFor="age" className="w-full text-sm text-gray-700">age</label>
        <input
          id="age"
          type="number"
          name="age"
          placeholder="Enter your age"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.age}
          onChange={handleChange}
        />

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
        <div className="flex gap-2">
          <p>If you already Register</p>
          <span className="hover:cursor-pointer text-indigo-500 hover:text-xl transition-all" onClick={goToLogin}> LogIn Here</span>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          Register
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};
