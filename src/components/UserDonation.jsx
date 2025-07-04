import React,{useState,useEffect} from 'react'
import axiosClientUser from './interceptors/axiosClientUser'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function UserDonation() {
    const [data,setData]=useState([]);
    const fetchData=async ()=>{
        try{
          const res=await axiosClientUser.get('/issues/fetchDonatedIssues')
          if(res && res.data && res.data.data)
          setData(res.data.data);
        }
        catch(error){
            toast.error(error.response?.data?.message || "Unable to fetch records")
        }
    }
    useEffect(()=>{
      fetchData()
    },[])
  return (
    <div className='w-full max-w-lg'>
    {data?.map(issue =>(<div className='w-full'>
      <div className='w-full flex h-36'>
        <div className='w-1/3 h-full'>
        <img className='w-40 h-32 object-cover'  src={issue.issue.images ? issue.issue.images : '../public/noImage.jpg'}/>
        </div>
        <div className='w-2/3 h-full flex-col'>
         <h1 className=''>Issue Title:{issue.issue.title}</h1>
         <h1 className=''>Quantity:{issue.quantity}</h1>
         <Link
              to={`/user/issues/${issue.issue._id}`}
              className='inline-block text-sm bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700 transition'
            >
              View Details
            </Link>
        </div>
        </div>

    </div>
      ) )}
      {!data && (<div className='w-full bg-amber-600 text-pink-500'>
        No Donation Made Till Now!
      </div>)}
    </div>
  )
}

export default UserDonation