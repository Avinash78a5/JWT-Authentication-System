import React from "react";

import { useForm } from "react-hook-form";
import {Link} from "react-router-dom"

const Register = () => {


  const { register,handleSubmit,formState:{errors},reset} = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try{
      const response = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      })
      if(response.status === 201){
        alert("Registration successful! Please login.");
      }
      const result = await response.json();
      console.log(result);
    } catch(error){
      console.error("Error:",error);
      alert("Registration failed. Please try again.");
    }

    reset();
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
        <h1 className="text-3xl font-semibold text-slate-900 text-center mb-8">Register</h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text" {...register("name",{required:"Name is required"})}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", { 
              required: "You must enter an email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }})}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password",{required:"Password is required",minLength:{value:6, message:"Password must be at least 6 characters"}})}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-2">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              {...register("mobile",{required:"Mobile number is required",pattern:{value:/^\d{10}$/, message:"Invalid mobile number"}})}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 text-white py-3 text-base font-semibold transition hover:bg-slate-700"
          >
            Register
          </button>
          <p className="text-sm text-center text-slate-500 mt-4">
            Already have an account? <Link to="/login" className="text-slate-700 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
