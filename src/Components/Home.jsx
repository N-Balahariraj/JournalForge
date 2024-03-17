import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='Home'>
            <div className='w-[50%] h-[100%] opacity-10'>
                <img src="/TradeMark.png" alt="TradeMark" className='w-[100%] h-[100%]' />
            </div>
            <div className='w-[50%] h-[50%] flex flex-col gap-[15%] absolute z-10 top-[25%] left-[30%] font-Nunito'>
                <div className="w-[50%] flex flex-col text-right">
                    <span className='text-7xl font-extrabold'>Welcome </span>
                    <span className='font-bold text-3xl'>To JournalForge </span>
                    <span className='font-light text-xs font-Roboto'>Where Knowledge Meets Discovery</span>
                </div>
                <div className='w-[100%] flex flex-col items-center gap-2 self-start'>
                    <span className='w-[100%] text-center text-xl'>Join a Global Community of Scholars and Innovators in Pushing the Boundaries of Knowledge</span>
                    <Link to={"/Journals"} className='w-[20%] bg-[#caf173] p-2 rounded-full font-semibold text-center'>Start Exploring</Link>
                </div>
            </div>
        </div>
    )
}
