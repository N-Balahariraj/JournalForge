import React from 'react'

export default function JournalCards({id,title,pic,desc,setJournal}) {
  return (
    <div className='w-[90%] h-[50%] flex border-2 rounded-lg' onClick={()=>{setJournal(id)}}>
      <div className="w-[45%] flex flex-col items-center border-2 rounded-md">
        <span className='text-lg font-semibold p-2'>{title}</span>
        <img src={pic} alt="JournalPic" className='h-[80%] w-[90%] rounded-lg' />
      </div>
      <div className="w-[55%] text-center flex items-center border-2 rounded-md font-Nunito font-medium">
        <span>{desc}</span>
      </div>
    </div>
  )
}
