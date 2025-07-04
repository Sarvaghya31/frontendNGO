import React,{useRef, useState,useEffect} from 'react'
import axiosClientNGO from './interceptors/axiosClientNGO'
 import { useForm, useWatch } from 'react-hook-form'
 import {Input,Button,Select} from './index.js'
 import '@maptiler/sdk/dist/maptiler-sdk.css';
import * as maptilersdk from '@maptiler/sdk';
import "./stylesheet/map.css"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
 
function AddIssue() {
    const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const markerRef = useRef(null);
  const navigate=useNavigate()
 maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;



    const {register,handleSubmit,control,formState:{errors}}=useForm()
    const [location,setLocation]=useState([77.10,28.70])
    const [formsubmiting,Setformsubmiting]=useState(false)
    
    const getngo=async()=>{
        try{
            const res=await axiosClientNGO('/NGO/getNGO');
            console.log(res.data.data.coords);
            setLocation(res.data.data.coords);
        }
        catch(err){
          setLocation([77.10,28.70]);
        }
    }

    useEffect(()=>{
        getngo();
    },[])

     // 1. Initialize map ONCE
useEffect(() => {
  mapRef.current = new maptilersdk.Map({
    container: mapContainer.current,
    style: maptilersdk.MapStyle.STREETS,
    center: location,
    zoom: 15
  });

  markerRef.current = new maptilersdk.Marker({ draggable: true })
    .setLngLat(location)
    .addTo(mapRef.current);

  markerRef.current.on('dragend', () => {
    const lngLat = markerRef.current.getLngLat();
    setLocation([lngLat.lng, lngLat.lat]);
  });

  return () => {
    mapRef.current?.remove();
  };
}, []); // only once

// 2. Update map center and marker if location changes (e.g., from getngo)
useEffect(() => {
  if (mapRef.current && markerRef.current) {
    mapRef.current.setCenter(location);
    markerRef.current.setLngLat(location);
  }
}, [location]);

    const submitIssue=async(data)=>{
        try{
          Setformsubmiting(true)
          const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("establishmentName", data.establishmentName);
      const isPickupOpted = data.reqPickup.opt === "Yes";

      formData.append("reqPickupOpt", isPickupOpted);
formData.append("pickupFreq", data.reqPickup.pickupfreq);
formData.append("pickupCharges", data.reqPickup.pickupCharges);
    const isFood=data.isFood;
    formData.append("isFood",isFood);
    formData.append("dropPoint",JSON.stringify(location))
    formData.append("images", data.image[0]); 
    formData.append("contactNum",data.contactNum)
    //console.log("hello");
    const response=await axiosClientNGO.post('/issues/submitIssueByNGO',formData,{headers: {"Content-Type": "multipart/form-data",}})
    //console.log(response);
    toast.success("Issue Submitted")
    navigate("/ngo")
    
    }
    catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong!')
      Setformsubmiting(false)
    }
        
    }
   
    const pickupOption = useWatch({
    control,
    name: "reqPickup.opt",
    defaultValue:"No"
    })

  return (
    
    <form onSubmit={handleSubmit(submitIssue)} className='max-w-2xl w-full mx-auto'>
        <div className='max-w-2xl w-full mt-8'>
        <Input
        label="Title"
        type="text"
        className="mb-4"
        placeholder="Enter the title here"
        {...register("title",{required:true})}
        
        >
        </Input>

        <Input
        label="Description"
        type="text"
        className="mb-4"
        placeholder="Description"
        {...register("description",{required:true})}
        >
        </Input>
         
        <Input
        label="Building Name"
        type="text"
        className="mb-4"
        placeholder="Building Name/Area Name"
        {...register("establishmentName",{required:true})}
        >
        </Input>

        <div ref={mapContainer} style={{ height: '500px' }} className="w-full h-[400px] max-w-6xl rounded-lg border border-gray-800 .map mb-4" />

        <Select
        options={["No","Yes"]}
        label="Opt for Pickup"
        className="mb-4"
        {...register("reqPickup.opt")}>
        </Select>
        
        {pickupOption === "Yes" && (<div>
        <Select
        options={["Weekly","Biweekly","Monthly"]}
        label="Pickup Frequency"
        className="mb-4"
        {...register("reqPickup.pickupfreq")}>
        </Select>

        <Input
        label="Pickup Charges"
        type="text"
        className="mb-4"
        placeholder="Enter the pickup price if any"
        {...register("reqPickup.pickupCharges",{required:true})}
        >
        </Input>
   </div>)}

        <Input
        label="Contact Number"
        type="text"
        className="mb-4"
        placeholder="Contact Number"
        {...register("contactNum",{required:true,
          minLength: {
                value: 10,
                message: "Phone number must be 10 digits",
                },
                maxLength: {
                value: 10,
                message: "Phone number must be 10 digits"},
                pattern: {
                value: /^\d{10}$/,
                message: "Must be number"}
        })}
        error={errors.contactNum?.message}
        >
        </Input>

        <Select
        options={["Yes","No"]}
        label="is it Food related?"
        className="mb-4"
        {...register("isFood")}>
        </Select>

        <Input 
        label="Cover Image"
        type="file"
        className="mb-4"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image")}
        />

        <Button
        type="submit"
        disabled={formsubmiting}
        >
          {!formsubmiting?"Submit Issue":"Submiting"}
        </Button>

    </div>
    </form>
  )
}

export default AddIssue