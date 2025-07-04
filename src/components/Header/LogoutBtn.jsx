import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { logout} from '../../store/authSlice'
import axiosClientUser from '../interceptors/axiosClientUser';
import axiosClientNGO from '../interceptors/axiosClientNGO';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const userLogin=useSelector((state)=>state.auth.isUser)
    const NGOLogin=useSelector((state)=>state.auth.isNGO)
    const logoutHandler = async () => {
    try{
      let response;
    if(userLogin)
    {
      response=await axiosClientUser.get('/users/logoutUser');
    }
    else if(NGOLogin)
    {
      response=await axiosClientNGO.get('/NGO/logoutNGO');
    }
    if(response.status===200)
    {
      dispatch(logout());
      toast.success("Logged Out Successfully")
      navigate('/')
    }
    }
    catch(error)
    { console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
    }
  return (
    <div>
      <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>LogOut</button>
    </div>
  )
}

export default LogoutBtn