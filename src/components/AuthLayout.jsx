import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {
  const navigate = useNavigate()
  const [loader,setLoader] = useState(true)
  const NGOauthStatus = useSelector(state=> state.auth.isNGO)
  const UserauthStatus = useSelector(state=> state.auth.isUser)
  const Status = useSelector(state=> state.auth.status)
  useEffect(()=>{
    if(authentication && Status !== authentication){
      navigate("/login")}
      else if(!authentication && Status!==authentication){
        if(NGOauthStatus)
         {navigate("/ngo")}
        else{
          navigate("/user")
        }
      }
      setLoader(false)
    }
  ,[Status,navigate,authentication])
  return loader ? <h1>Loading ...</h1> : <>{children} </>
}