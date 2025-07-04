import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClientNGO from './interceptors/axiosClientNGO'
import { useEffect } from 'react'
import {saveAs} from 'file-saver'
import {Button,Input} from './index.js'
import toast from 'react-hot-toast'
import axiosClientUser from './interceptors/axiosClientUser.js'
function DetailedNGO() {
   const {postId}=useParams()
   const [data,setData]=useState(null)
   const [donorData,setDonorData]=useState(null)
   const[isCompleted,setisCompleted]=useState(false)
   const [check,setCheck]=useState(false);
   const fetchData=async()=>{
    try{
     const res=await axiosClientNGO.get(`/issues/showIssueNGO/${postId}`)
     setData(res.data.data);
     setisCompleted(res.data.data.isCompleted)
    // console.log(res.data.data);
    }
    catch(error){
        toast.error(error.response?.data?.message || 'Something went wrong!')
    }
   }

   const fetchUserInfo=async()=>{
    try{
      const res=await axiosClientUser.get(`/issues/fetchUserforNGO/${postId}`)
      setDonorData(res.data.data);
      console.log(res.data.data);
      setCheck(false)
    }
    catch(error){
      toast.error(error.response?.data?.message || 'Something went wrong!')
    }
   }

   useEffect(()=>{
    fetchData(),
    fetchUserInfo()
   },[check])

  const confirmDonation=async(issueUserid)=>{
    try{
    const res=await axiosClientNGO.get(`/issues/markDonated/${issueUserid}`)
    setCheck(true)
    }catch(err){
      toast.error(err.response?.data?.message || 'Something went wrong!')
    }
  }

  const contacted=async(id)=>{
    try{
      const res=await axiosClientNGO.get(`issues/contacted/${id}`);
      toast.success("contacted")
      setCheck(true)
    }
    catch(err){
      toast.error(err.response?.data?.message || 'Something went wrong')
    }

  }

   const deactivateIssue=async()=>{
    try{
        const res=await axiosClientNGO(`/issues/fulfillIssue/${postId}`);
        setisCompleted(true)
    }
    catch(error){
      toast.error(error.response?.data?.message || 'Something went wrong!')
    }
   }

   const download=(url)=>{
    try{
       saveAs(url,'qrcode.png')
    }
    catch(err)
    {
      toast.error("Unable to download the QR")
    }
   }
   
   
  return (
    <div className='w-full mx-auto gap-4'>
     <div className='w-full flex items-center justify-center gap-4 mb-4'>
      <div className='w-full h-full sm:h-128 sm:w-1/2'>
       <img src={data?.images ? data.images : '/noImage.jpg' } className='w-full h-full object-fit rounded-xl shadow-lg'/>
      </div>
     </div>
     <div className='mb-4 border-b-4 border-amber-600 flex items-center justify-center flex-col gap-4'>
        <h2 className='text-6xl mb-2 text-red-600'>{data?.title}</h2>
        <h3 className='text-4xl mb-2'>{data?.description}</h3>
        <h4 className='text-2xl mb-2'>{data?.totalDonated} units Pledged Till Now</h4>
        <h4 className='text-2xl mb-2'>{data?.establishmentName},{data?.createdBy?.city}</h4>
        <div className='h-48 w-48 mb-4'>
       <img src={data?.qrCode ? data.qrCode : '/noImage.jpg' } className='w-full h-full object-fit rounded-xl shadow-lg' onClick={()=>{download(data.qrCode)}}/>
      </div>
      <h4>Click on the QR to download</h4>
        {!isCompleted && <Button onClick={deactivateIssue} className='my-2 w-32'>
        Disable Issue
        </Button>}
     </div>
     <div className='w-full'>
      <h1 className='text-4xl'>List of Donors</h1>
      <div className='flex flex-col sm:flex-row sm:flex-wrap sm:space-x-2 items-center justify-center mx-auto'>
        {
          donorData?.map((user)=>(
        
            <div className='w-full sm:w-1/3 md:w-1/4 h-96 flex flex-col items-center justify-center'>
             
              <div key={user._id} className='w-full flex-col border-2 border-amber-800 space-y-2 mb-2'>
               <div className='h-40 w-full flex justify-center items-center'>
               <img src={user.createdBy.profilePic?user.createdBy.profilePic  : '/nodp.png'} className='object-contain h-full w-full rounded-3xl'></img>
              </div>
              <div className='w-full flex flex-col items-center justify-center'>
              <div className=' text-2xl'>
               Name:{user.createdBy?.fullName}
              </div>
              <div className='text-lg'>
                Email:{user.createdBy?.email}
              </div>
              <div className='text-lg'>
                Contact Number:{user.createdBy?.phoneNumber}
              </div>
              <div className=' text-lg'>
                Quantity:{user.quantity}
              </div>
              <div className='flex justify-between'>
              <Button onClick={()=>{confirmDonation(user._id)}} className='pb-1 mb-1 mr-2'>
                Mark as Donated
              </Button>
              {!user.seen && <Button onClick={()=>{contacted(user._id)}} className='pb-1 mb-1'>
                Mark as Contacted
              </Button>}
              </div>
              </div>
              </div>
            </div>
          ))
        }
      </div>
     </div>
    </div>
  )
}

export default DetailedNGO