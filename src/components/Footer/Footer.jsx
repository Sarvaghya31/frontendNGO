import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-amber-300 border-2 border-amber-700">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="flex flex-col justify-center">
                    <div className='flex justify-center'>
                    <Logo/>
                    </div>

                    <div className='flex flex-col flex-wrap justify-center items-center'>
                    <h3 className='text-shadow-blue-600 mx-auto'>For any issue and suggestions,contact at:</h3>
                    <h3 className='text-shadow-blue-600 font-bold'> sarvaghyajoshi2003@gmail.com</h3>
                    </div>
        
                </div>
            </div>
        </section>

  )
}

export default Footer