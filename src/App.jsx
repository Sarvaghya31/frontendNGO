import React,{ useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Header,Footer } from './components/index.js'
import './App.css'
import CustomToaster from './components/CustomToaster.jsx'
import { UserLogin,NGOLogin } from './store/authSlice.js'
import axiosClientUser from './components/interceptors/axiosClientUser.js'
import axiosClientNGO from './components/interceptors/axiosClientNGO.js'
import Loader from './components/Loading.jsx'
function App() {
const dispatch=useDispatch();
const [loading,SetLoading]=useState(true)
const [dataloading,Setdataloading]=useState(false)
useEffect(()=>{
axiosClientNGO.interceptors.request.use((config)=>{
  Setdataloading(true);
  return config;
},(error)=>{
  return Promise.reject(error);
})
axiosClientNGO.interceptors.response.use((response)=>{
  Setdataloading(false);
  return response;
},(error)=>{
  Setdataloading(false)
  return Promise.reject(error)
})
axiosClientUser.interceptors.request.use((config)=>{
  Setdataloading(true);
  return config;
},(error)=>{
  return Promise.reject(error);
})
axiosClientUser.interceptors.response.use((response)=>{
  Setdataloading(false);
  return response;
},(error)=>{
  Setdataloading(false)
  return Promise.reject(error)
})

},[])


const login=async()=>{
  try{
  const res1=await axiosClientUser.get('/users/getCurrentUser');
  if(res1?.data?.success)
  {
    dispatch(UserLogin(res1.data.data));
    return;
  }
  }
  catch(error){
    console.log(error);
  }
  try{
    const res2=await axiosClientNGO.get('/NGO/getNGO');
  if(res2?.data?.success){
    dispatch(NGOLogin(res2.data.data))
    return;
  }
  SetLoading(false);
  }
  catch(error){
    console.log(error);
  }
}
  useEffect(() => {
    login().finally(() => SetLoading(false));
  }, []); 


  return !loading? (
    <div className='min-h-screen mx-auto flex flex-wrap content-between'>
    <div className='w-full block'>
    <CustomToaster/> 
    <Header/>
    <main className='border-1 mt-10 pt-16 border-pink-600  bg-amber-100'>
      {dataloading && <Loader/>}
       <Outlet/>
    </main>
    <Footer/>
    </div>
   
    </div>
  ) : "Loading"
}


export default App
