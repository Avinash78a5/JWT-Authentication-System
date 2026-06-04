import React from 'react'
import { useForm } from "react-hook-form";
import {Link,useNavigate} from "react-router-dom"

const Login = () => {
   const { register,handleSubmit,formState:{errors},reset} = useForm();
    
   const navigate = useNavigate();

    const onSubmit = async (data) => {
      console.log(data);
      try{
        const response = await fetch("http://localhost:5000/api/auth/login",{
          method:"POST",
          credentials: 'include', //To send and receive cookies
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
        })
        if(response.status === 200){
          alert("Login Successful..");
          const result = await response.json();
          console.log(result);
          const { accessToken } = result;

          if(accessToken){
            localStorage.setItem("accessToken",accessToken);
          } else {
            console.log("Access Token missing");
          }

          //navigate to userdetails
          navigate('/userDetails');
        }


      } catch(error){
        console.error("Error:",error);
        alert("Login failed. Please try again.");
      }
  
      reset();
    }
  
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-semibold text-slate-900 text-center mb-8">Login</h1>
  
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
  
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
  
            
  
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 text-white py-3 text-base font-semibold transition hover:bg-slate-700"
            >
              Login
            </button>
            <p className="text-sm text-center text-slate-500 mt-4">
              Already have an account? <Link to="/" className="text-slate-700 hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  
}

export default Login