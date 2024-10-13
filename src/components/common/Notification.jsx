import React from 'react'
import rightnotificationarrow from "../../assets/Intersect.svg"
const Notification = ({message, date}) => {
  return (
    <div className='py-4 px-6 bg-white relative ' style={{boxShadow: "4px 4px 40px 0px #00000033" 
    }}>
      <p className='font-redhat font-bold text-2xl '>Notification</p>
      <div className='pt-8 flex justify-between items-center '>
      <p className='font-redhat font-bold text-base max-w-[65%]'>Joe Dhawale <span className='font-semibold'>{message}</span></p>
      <p className='font-sans text-[#666666] text-xs '>{date}</p>
    </div>
    <img src={rightnotificationarrow} alt="rightarrow" className='absolute -top-6 right-0' />
    </div>
  )
}

export default Notification
