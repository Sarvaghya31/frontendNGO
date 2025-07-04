import React, { useEffect, useState } from 'react';
import axiosClientUser from './interceptors/axiosClientUser';
import {Map,IssueComponent,LiveSearch} from './index.js'
import { useSelector,useDispatch } from 'react-redux';
import { updateIssues } from '../store/issueSlice.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function UserMainPage() {
const [userLocation,setuserLocation]=useState([])
const dispatch=useDispatch()
const allIssues=useSelector((state)=>(state.issue.issues));
const fetchUserInfo= async () => {
  try{
  const res=await axiosClientUser.get('/users/getCurrentUser')
  setuserLocation(res.data.data.coords);
  }
  catch(error)
  {
    toast.error(error.response?.data?.message || "Something went wrong")
  }
}

const fetchIssues = async () => {
  try{
 const res = await axiosClientUser.get('/issues/getIssues');
 dispatch(updateIssues(res.data.data));
 
  }
  catch(error){
    toast.error(error.response?.data?.message || "Something went wrong")
  }
 };
  useEffect(()=>{
   fetchUserInfo();
   fetchIssues();
   console.log(userLocation)
  },[])


  return (
    <div className='w-full flex-col gap-3'>
      <div className='w-full'>
        <LiveSearch allIssues={allIssues}>

        </LiveSearch>
      </div>
      <div className='w-full'>
        <Map coordinates={userLocation} markers={allIssues} navigate={useNavigate()} /> 
      </div>
      <div className='w-full'>
        <IssueComponent allIssues={allIssues} >
        </IssueComponent>
      </div>
    </div>
  );
}

export default UserMainPage;
