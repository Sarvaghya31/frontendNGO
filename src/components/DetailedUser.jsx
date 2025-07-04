import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axiosClientUser from './interceptors/axiosClientUser'
import toast from 'react-hot-toast'
import { useForm,useWatch } from 'react-hook-form'
import {Input,Button,Select,Map} from './index'

function DetailedUser() {
    const [details,setDetails]=useState('')
    const [hasDonated,sethasDonated]=useState(true)
    const {postId}=useParams()
    const {register,handleSubmit,control,watch}=useForm({
  defaultValues: {
    quantity: '',
    reqPickup: {
      opt: 'No',
      pickupLocation: '',
      contactNumber: ''
    }
  }
})
    const fetchData=async()=>{
        try{
            const res=await axiosClientUser.get(`issues/showIssueUser/${postId}`)
            setDetails(res.data.data)
            //console.log(res.data.data);
        }
        catch(error){
          toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    const fetchDonatedInfo=async()=>{
      try{
        const res=await axiosClientUser.post('issues/checkDonated',{issueId:postId})
        if(res)
        {
          sethasDonated(res.data.data.hasDonated);
        }
        console.log(res.data.data.hasDonated)
      }
      catch(error){
        toast.error(error.response?.data?.message || "Something went wrong")
      }
    }
    useEffect(()=>{
        fetchData();
        fetchDonatedInfo();
    },[hasDonated]);

  const onSubmitform= async(data)=>{
    try{
      console.log(data);
      data.reqPickup.opt=data.reqPickup.opt==="Yes"?true:false;
        const response=await axiosClientUser.post(`issues/submitIssueByUser/${postId}`,data)
        toast.success("Successfully Pledged")
        sethasDonated(true)
    }
    catch(err)
    {   console.log(err)
        toast.error(err.response?.data?.message || "Something went Wrong")
    }
  }

  const pickupOption = useWatch({
      control,
      name: "reqPickup.opt"
      })
  

  return (
    <div className='w-full bg-amber-100 flex-col gap-2'>
        <h1 className='font-bold text-4xl text-center'>{details.title}</h1>
        <Map coordinates={details.dropPoint} markers={details?[details]:''}></Map>
        <h3 className='ml-4 text-amber-950 text-2xl mb-1 font-semibold'>Raised By:{details?.createdBy?.Name}</h3>
        <h4 className='ml-4 text-amber-950 text-2xl mb-1 font-semibold'>{details.totalDonated} pledges till now</h4>
        
        {!hasDonated?<div>
            <div className='mt-8'>
        <h2 className='ml-4 text-amber-950 text-3xl font-semibold'>Pledge to Donate?</h2>
        <h2 className='ml-4 text-amber-950 text-3xl font-semibold'>Fill the form Below!</h2>
        </div>
           <form onSubmit={handleSubmit(onSubmitform)}
        className='w-full'>
        <div className='mt-8'>
         <Input label="Units :"
         placeholder="Enter the number of units"
         className='mb-4'
         {...register("quantity",{required:true})}>
         </Input>
         </div>
         <div className='mt-8'>
        
         {details?.reqPickupOpt?.opt && (
          <div>
             <Select
         options={["No","Yes"]}
         label="Opt for Pickup"
         className="mb-4"
         {...register("reqPickup.opt")}
          active={details?.reqPickupOpt?.opt}>
         </Select>
           {pickupOption==="Yes" && (<><div>Pickup Frequency:{details.reqPickupOpt?.pickupfreq}</div>
            <div>Pickup Charges:{details.reqPickupOpt?.pickupCharges}</div>
         
          <Input
          label="pickupLocation"
          className='mb-4'
          {...register("reqPickup.pickupLocation")}
          >
          </Input></>)}
          <Input
          label="Contact Number"
          className='mb-4'
          {...register("reqPickup.contactNumber")}
          ></Input>
          </div>
         )}
         </div>
         <Button type="submit" className='' bgColor="bg-green-500">Submit</Button>
        
        </form></div>:
         <div className='mt-4 mb-4 pb-4'>
<h2 className='ml-4 text-amber-950 text-3xl'>You have already Pledged!</h2>
        </div>
}

        <h2 className='m-4 border-2 p-2 border-amber-500 text-2xl font-semibold text-amber-950'>Collection Centre: {details.establishmentName}</h2>

    </div>
  )
}

export default DetailedUser