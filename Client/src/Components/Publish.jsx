import React from 'react'

export default function Publish() {
  return (
    <form action="#" className='Publish'>
      <label htmlFor="Title">Title :</label>
      <input type="text" id='Title' className='h-[7%] outline-none border-2 rounded-lg px-2'/>
      <label htmlFor="Description">Description :</label>
      <textarea name="" id="Description" cols="30" rows="10" className='h-[25%] outline-none border-2 rounded-lg px-2'></textarea>
      <label htmlFor="Author">Author :</label>
      <input type="text" id='Author' className='h-[7%] outline-none border-2 rounded-lg px-2'/>
      <label htmlFor="Email">Email :</label>
      <input type="text" id='Email' className='h-[7%] outline-none border-2 rounded-lg px-2'/>
      <button className='h-[9%] bg-black text-white rounded-lg'>Post</button>
    </form>
  )
}
