import React,{useEffect,useState,useRef} from 'react'
import axiosClientNGO from './interceptors/axiosClientNGO'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'


function NGOMainPage() {
const [NGOData,setNGOData]=useState(null)
const [issues,setIssues]=useState(null)

const fetchNGO=async()=>{
    try{
        const res=await axiosClientNGO.get('/NGO/getNGO');
        console.log(res.data.data)
        setNGOData(res.data.data)
    }
    catch(err){
        toast.error(err.response?.data?.message || "Something went wrong")
    }
}

const fetchIssues=async()=>{
    try{
        const res=await axiosClientNGO.get('issues/fetchPostedIssues')
        setIssues(res.data.data)
        console.log(res.data.data)
        
    }
    catch(err){
        toast.error(err.response?.data?.message || "Something went wrong")
    }
}

const mark=async (id)=>{
try{
const res=await axiosClientNGO.get(`issues/seen/${id}`);
}catch(err)
{
toast.error(err.response?.data?.message || "Something went wrong")
}

}

useEffect(()=>{
fetchNGO(),
fetchIssues()
},[])
 


  return (
    <>
    <div className='w-full mb-7 '>
     <div className='p-4 w-full flex-col items-center justify-center'>
     <h1 className='mb-4 font-bold text-amber-950 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center break-words px-2'>{NGOData?.Name}</h1>
     <h2 className='text-3xl font-bold text-amber-900 sm:text-4xl md:text-5xl lg:text-6xl text-center break-words px-2'>
  {NGOData?.city}, {NGOData?.state}
</h2>
     </div>

     <div className='p-4 w-full flex items-center justify-center'>
     <div className='rounded-full w-60 h-60 text-center text-5xl bg-blue-500 flex items-center justify-center text-blue-900'>
      {issues?.length?issues.length:0} Issue Added
     </div>
     </div>
    </div>


   {issues?.length>0? (<div className='w-full flex flex-col space-y-2'>
   { issues.map((issue)=>(!issue.isCompleted && <Link className='relative w-full my-1 h-44 sm:h-40 bg-amber-200 py-2' key={issue._id}
        to={`/ngo/issues/${issue._id}`}
        onClick={()=>(mark(issue._id))}
        >
          {issue.quantityDonated.length !== issue.lastSeenCount && (
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
        {issue.quantityDonated.length-issue.lastSeenCount} new Donations
      </div>
    )}
    <div className='w-full h-44 flex flex-col space-y-2 justify-center items-center sm:flex-row sm:space-x-2 sm:h-40'>
      <div className='h-32 w-full sm:w-1/3 sm:h-40 flex justify-center'>
      <img className='h-32 sm:w-full sm:h-full' src={issue.images ||'/noImage.jpg'}></img>
      </div>
      <div className='w-full text-center text-2xl sm:w-2/3 sm:text-start h-full font-bold text-amber-900'>
       {issue.title}
      </div>
    </div>
    </Link>)
    )
    }
   </div>) : ""}
   </>
  )
}

export default NGOMainPage