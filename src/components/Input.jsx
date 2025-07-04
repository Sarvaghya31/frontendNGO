import React,{useId} from 'react'

//we can write a normal function also there is no problem,just for understanding perspective we are using arrow function because it looks clean and give better understanding

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    error,
    ...props
},ref){
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label
        className='inline-block mb-1 pl-1'
        htmlFor={id}>
            {label}
            </label>}
    <input type={type} 
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
    ref={ref}
    {...props}
    id={id}/>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

    </div>
  )
})

export default Input