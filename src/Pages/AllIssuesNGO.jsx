import React from 'react'
import { Container } from '../components'
import IssueComponent from '../components'
import { useEffect,useState } from 'react'
import axiosClientNGO from '../components/interceptors/axiosClientNGO'
function AllIssuesNGO() {
    const [issues,setIssues]=useState([])
  const fetchIssues=async ()=>{
    try{
const res=await axiosClientNGO('/issues/fetchPostedIssues');
setIssues(res.data.data);
    }
    catch(error){
        toast.error(error.response?.data?.message || "Unable to fetch records")
    }
    useEffect(()=>{
      fetchIssues();
    },[])
  }
  return (
    <>
    <IssueComponent ></IssueComponent>
    </>
  )
}

export default AllIssuesNGO