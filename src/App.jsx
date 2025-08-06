import React, { useCallback, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  // changes in ui paasword on changes length, clicked numbers, characters, hence we use usestate
  const[length,setLength] = useState(8);
  const[numbers,setNumbers] = useState(false);
  const[Characters,setCharacters] = useState(false);
  const[password,setPassword] = useState("");

  // we can directly write this generatePassword function but we write this in the useCallback because useCallback dependencies are used to memoize function again whenever any changes are found in dependencies, here dependecies are length, numbers and characters which is written in the array -> usecallback simply used here for optimisation because it memoise the function

  const generatePassword = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabhcdefghijklmnopqrstuvwxyz"
    if(numbers) str+="0123456789"
    if(Characters) str+="!@#$%^&*"
    for(let i=1; i<=length; i++) {
      let index = Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(index)
    }

    setPassword(pass);

  },[length,numbers,Characters])

  // here we want that on any changes perform on length, numbers and characters a new paasword is generated means generate paasword is called -> here there is no button names generate paasword , we have to call the generate paasword function on any changes in the dependecies. Hence we use useEffect in this  

  useEffect(()=>{
    generatePassword()
  },[length, numbers,Characters])

  // same as above for optimisation we can useCallback here also , we can also write directly the function if we want. Here dependecy is only password because we copy only the changed passwords
  
  const copyToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);  // in react we write window for copy in clipboard
    toast.success("copied to clipboard")
  },[password])

  return (
    <>
      <Toaster position='top-center' /> 
      <div className=' w-full flex justify-center mt-20'>
      <div className='bg-zinc-700 w-[50%] rounded-lg flex flex-col justify-center items-center py-8'>
        <h1 className='text-white text-2xl font-semibold'>Password Generator</h1>
        <div className='flex w-[80%] mt-5 gap-1'>
        <div className=' bg-amber-50 w-full flex items-center rounded-md '>
          <input className='px-2 w-full h-full outline-none text-xl font-semibold text-orange-500 placeholder-zinc-400 tracking-wide' type="text" placeholder='password'
          value={password} readOnly
          />
        </div>
        <button className='py-2 px-4 text-lg rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer' onClick={copyToClipboard}>copy</button>
        </div>
        <div className='flex mt-6 gap-x-5  text-orange-500 font-medium'>
          <div className='flex justify-center items-center gap-2'>
            <input type="range" className='cursor-pointer' min={8} max={30} value={length} 
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label> length:{length}</label>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <input type="checkbox" defaultChecked={numbers} onChange={()=>setNumbers((prev)=>!prev)}/>
            <label>Numbers</label>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <input type="checkbox" onChange={()=>setCharacters((prev)=>!prev)}/>
            <label > Characaters</label>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App