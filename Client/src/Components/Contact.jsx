import React from 'react'

export default function Contact() {
  return (
    <div className='Contact'>
      <div className="w-[35%] bg-[#2f2f2f] p-5 text-white flex flex-col items-center gap-[13%] pt-[8%]">
        <span className='w-[70%] inline-block text-xl text-center'>Contact Us Today for Personalized Support and Assistance</span>
        <ul className='list-disc'>
          <li>+14 5464 8272</li>
          <li>rona@domain.com</li>
          <li>Abc 123 , Xyz</li>
        </ul>
      </div>
      <div className="w-[65%] p-5 flex flex-col items-center justify-around">
        <div className='flex h-[25%] w-[80%] justify-between'>
          <div className='col-flex'>
            <label htmlFor="FN">First Name :</label>
            <input type="text" id='FN' placeholder='Your First Name' />
          </div>
          <div className='col-flex'>
            <label htmlFor="LN">Last Name :</label>
            <input type="text" id='LN' placeholder='Your Last Name'/>
          </div>
        </div>
        <div className='flex h-[25%] w-[80%] justify-between'>
          <div className='col-flex'>
            <label htmlFor="Mail">Email :</label>
            <input type="text" id='Mail'placeholder='Your Email' />
          </div>
          <div className='col-flex'>
            <label htmlFor="PN">Phone Number :</label>
            <input type="text" id='PN'placeholder='Your Mobile Number' />
          </div>
        </div>
        <div className='flex flex-col gap-5 h-[25%] w-[80%]'>
          <label htmlFor="Message">Message :</label>
          <textarea name="" id="Message" cols="30" rows="10" placeholder='Message' className='outline-none border-2 border-black rounded-lg p-5 text-center'></textarea>
        </div>
        <button className='h-[10%] w-[25%] ml-[10%] p-2 bg-[#c9f471] rounded-lg self-start'>Submit</button>
      </div>
    </div>
  )
}
