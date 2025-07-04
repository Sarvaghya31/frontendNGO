import React from 'react'
import { useNavigate } from 'react-router-dom'
function Scanner() {
  const navigate=useNavigate()
  const redirection=()=>{
    navigate('user/scanQR')
  }
  return (
    <button onClick={redirection} className='inline-flex items-center justify-center px-6'>
        <img className='w-10 h-10' src='/scanner.jpg'></img>
    </button>
  )
}

export default Scanner