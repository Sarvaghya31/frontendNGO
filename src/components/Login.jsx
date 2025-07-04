import React from 'react'
import {Button,Input} from './index.js'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { NGOLogin,UserLogin } from '../store/authSlice.js'
import { useDispatch } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'


function Login() {
  const [active,setActive]=useState('user')
  const userClicked=()=>(setActive('user'))
  const NGOClicked=()=>(setActive('NGO'))
  const {register,handleSubmit}=useForm()
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const loginUser=async(data)=>{
    try{
      const baseURL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL; 
      const response=await axios.post(`${baseURL}/users/loginUser`,data,{withCredentials:true});
      console.log(response);
      if(response)
      {
        dispatch(UserLogin(response.data.data));
        navigate("/user");
      }
      else{
        toast.error("Login Failed! Try Again!")
      }
    }
    catch(error)
    {console.log(error);
     toast.error(error.response?.data?.message || 'Something went wrong!')
    }
  }

  const loginNGO=async(data)=>{
    try{
      const response=await axios.post('/api/NGO/loginNGO',data,{withCredentials:true});
      if(response)
      {
        dispatch(NGOLogin(data));
        navigate("/ngo")
      }
      else{
        toast.error("Login Failed! Try Again!")
        navigate('/login')
      }
    }
    catch(error)
    {
     toast.error(error.response?.data?.message || 'Something went wrong!')
     navigate('/login')
    } 
  }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-amber-200 rounded-xl border-amber-400/20'>
        <div className='flex gap-2 p-3 '>
        <Button
        onClick={userClicked}
        bgColor=''
        className={`${active==='user'?'bg-blue-600 text-white':"bg-blue-400 text-gray-400"} w-1/2`}
        >
            User Login
        </Button>
        <Button
        onClick={NGOClicked}
        bgColor=''
        className={`${active==='NGO'?'bg-blue-600 text-white':"bg-blue-400 text-gray-400"} w-1/2`}
        >
            NGO Login
        </Button>
        </div>
            {active==="user"?(
            <form onSubmit={handleSubmit(loginUser)} className='mt-8 p-10'>
             <div className='space-y-5'>
              <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {
                ...register("email",{
                  required:true,
                  validate:{
                    matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                  }
                })
              }
              />
              <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password",{
                required:true
              })}
              />
              <Button
              type="submit"
              className='w-full'>
                Login
              </Button>
             </div>
            </form>
            ):
            (
            <form onSubmit={handleSubmit(loginNGO)} className='mt-8 p-10'>
             <div className='space-y-5'>
              <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {
                ...register("email",{
                  required:true,
                  validate:{
                    matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                  }
                })
              }
              />
              <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password",{
                required:true
              })}
              />
              <Button
              type="submit"
              className='w-full'>
                Login
              </Button>
             </div>
            </form>
            )}
            <p className="mt-4 text-center text-sm text-gray-700">
  Not a user?{" "}
  <Link to="/register" className="text-blue-600 hover:underline font-medium">
    Sign up
  </Link>
</p>
        </div>
        </div>
  )
}

export default Login