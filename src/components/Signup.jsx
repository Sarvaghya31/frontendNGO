import React,{useState} from 'react'
import {Button,Input} from './index.js'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'


function Signup() {
  
    const [active,setActive]=useState('user')
      const userClicked=()=>(setActive('user'))
      const NGOClicked=()=>(setActive('NGO'))
      const {register:registerData,handleSubmit:handleSubmitData}=useForm()
      const {register:registerOTP,handleSubmit:handleSubmitOTP}=useForm()
      const navigate=useNavigate();
      
      const [dataFormUser,setDataformUser]=useState({});
      const [otpid,setOtpid]=useState('');
      const [dataFormNGO,setDataformNGO]=useState({})
    


  const requestOTPUser=async(data)=>{
    try{
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("fullName", data.fullName);
      formData.append("city", data.city);
      formData.append("DP", data.image[0]); // from react-hook-form
      setDataformUser(formData);
       try {
      const response = await axios.post("/api/users/sendOTP", { email: data.email });

      if (response?.data?.data?._id) {
        setOtpid(response.data.data._id);
        toast.success("OTP sent")
      } else {
        toast.error("OTP not sent. Please try again.");
      }

    } catch {
      toast.error("Request the OTP again.");
    }
    }
    catch(error)
    {
     toast.error(error.response?.data?.message || 'Something went wrong!')
    }
  }

  const submitUser=async(data)=>{
    try{
      const res=await axios.post('/api/users/validateUser',{id:otpid,otp:data.otp});
      // console.log(res);
      if(res && res.data && res.data.data && res.data.data.validated)
      {
        try{
          const response=await axios.post('/api/users/registerUser',dataFormUser,{headers: {"Content-Type": "multipart/form-data"}})
          console.log(response);

          if(response?.data?.success)
          {
            navigate('/login')
          }
          else
          {
            toast.error("User Registration Failed")
          }
        }
        catch(err){
          toast.error(err.response?.data?.message || 'Something went Wrong')
        }
      }
      else{
        toast.error("OTP Verification Failed Please Try Again")
      }

    }
    catch(error){
       toast.error(error.response?.data?.message || 'Something went Wrong')
    }
  }

  const requestOTPNGO=async(data)=>{
    try{
      setDataformNGO(data);
      try{
      const response=await axios.post('api/NGO/sendOTP',{email:data.email});
      console.log(response)
      if (response?.data?.data?._id) {
        setOtpid(response.data.data._id);
        toast.success("OTP Sent")
      } else {
        toast.error("OTP not sent. Please try again.");
      }

    } catch {
      toast.error("Request the OTP again.");
    }  
    }
    catch(error)
    {
     toast.error(error.response?.data?.message || 'Something went wrong!')
    } 
  }

  const submitNGO=async(data)=>{
    try{
      const res=await axios.post('/api/NGO/validateNGO',{id:otpid,otp:data.otp});
      console.log("Response of validation",res);
      if(res && res.data && res.data.data && res.data.data.validated)
      {
        try{
          const response=await axios.post('/api/NGO/registerNGO',dataFormNGO)
          console.log("Response of Register NGO",response)
          if(response?.data?.success)
          {
            navigate('/login')
          }
          else
          {
            toast.error("User Registration Failed")
          }
        }
        catch(err){
          toast.error(err.response?.data?.message || 'Something went Wrong')
        }
      }
      else{
        toast.error("OTP Verification Failed Please Try Again")
      }

    }
    catch(error){
       toast.error(error.response?.data?.message || 'Something went Wrong')
    }
  }



  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-4xl bg-amber-200 rounded-xl border-amber-400/20'>
        <div className='flex gap-2 p-3'>
        <Button
        onClick={userClicked}
        bgColor=''
        className={`${active==='user'?'bg-blue-600 text-white':"bg-blue-400 text-gray-400"} w-1/2`}
        >
            User Register
        </Button>
        <Button
        onClick={NGOClicked}
        bgColor=''
        className={`${active==='NGO'?'bg-blue-600 text-white':"bg-blue-400 text-gray-400"} w-1/2`}
        >
            NGO Register
        </Button>
        </div>
            {active==="user"?(
              <div className='w-full'>
            <form onSubmit={handleSubmitData(requestOTPUser)} className='mt-8 p-10'>
             <div className='space-y-5'>
              <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {
                ...registerData("email",{
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
              {...registerData("password",{
                required:true,
                minLength:{
                  value:8,
                  message:"Password must be 8 characters long"
                }
              })}
              />
              <Input
              label='phoneNumber'
              type="text"
              placeholder="Enter your Mobile Number"
              {...registerData("phoneNumber",{
                required:true,
                minLength: {
                value: 10,
                message: "Phone number must be 10 digits",
                },
                maxLength: {
                value: 10,
                message: "Phone number must be 10 digits"},
                pattern: {
                value: /^\d{10}$/,
                message: "Must be exactly 10 digits"}
              })}/>

              <Input
              label="fullName"
              type="text"
              placeholder="Enter your Full Name"
              {...registerData("fullName",{
                required:true,
              })}
              />

              <Input
              label="city"
              type="text"
              placeholder="Enter your city"
              {...registerData("city",
                {required:true
              })}
              />
              <Input 
              label="Profile Photo"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...registerData("image")}
              />

              <Button
              type="submit"
              className=''>
                {!otpid? "Register":"Resend"}
              </Button>
             </div>
            </form>
             {otpid && <form onSubmit={handleSubmitOTP(submitUser)}
            className=''>
             <Input
             label="Enter the OTP sent on Email"
             type="text"
             className="mb-4"
             {...registerOTP("otp",{required:true})}/>
             <Button
             type="Submit"
             className=''>
              Submit
             </Button>
            </form>}
            </div>
            ):
            (
            <div className='w-full'>
            <form onSubmit={handleSubmitData(requestOTPNGO)} className='mt-8 p-10'>
             <div className='space-y-5'>
              <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {
                ...registerData("email",{
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
              {...registerData("password",{
                required:true
              })}
              />

              <Input
              label="city"
              type="text"
              placeholder="Enter you city"
              {
                ...registerData("city",{
                  required:true
                })
              }
              />

              <Input
              label="state"
              type="text"
              placeholder="Enter your State"
              {...registerData("state",{
                required:true
              })}
              />
               <Input
              label="Name"
              type="text"
              placeholder="Enter your Name"
              {...registerData("Name",{
                required:true
              })}
              />

              <Input
              label='phoneNumber'
              type="text"
              placeholder="Enter your Mobile Number"
              {...registerData("contactNum",{
                required:true,
                minLength: {
                value: 10,
                message: "Phone number must be 10 digits",
                },
                maxLength: {
                value: 10,
                message: "Phone number must be 10 digits"},
                pattern: {
                value: /^\d{10}$/,
                message: "Must be exactly 10 digits"}
              })}
              />

              <Button
              type="submit"
              className=''>
                {!otpid ? "Register":"Resend"}
              </Button>
             </div>
            </form>
            {otpid && <form onSubmit={handleSubmitOTP(submitNGO)}
            className=''>
             <Input
             label="Enter the OTP sent on Email"
             type="text"
             className="mb-4"
             {...registerOTP("otp",{required:true})}/>
             <Button
             type="Submit"
             className=''>
              Submit
             </Button>
            </form>}
            </div>
            )}
            <p className="mt-4 text-center text-sm text-gray-700">
  Already have an account{" "}
  <Link to="/login" className="text-blue-600 hover:underline font-medium">
    Login
  </Link>
</p>
        </div>
        </div>
  )
}

export default Signup