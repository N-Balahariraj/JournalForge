import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';


export default function NavBar({setSearch,user}) {
  return (
    <nav className='Navbar'>
        <span className='w-[5%] h-[50%] text-center text-2xl font-bold'>JF</span>
        <div className='w-[40%] h-[50%] flex items-center justify-around overflow-hidden border-2 border-black rounded-full'>
            <input type="text" className='w-[90%] border-none outline-none' onChange={(e)=>{setSearch(e.target.value)}}/>
            <FaSearch />
        </div>
        <Link to={"/Publish"} className='w-[10%] flex items-center justify-center gap-3 rounded-full p-2 bg-[#caf173]'><IoIosJournal/><span>Publish</span></Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/About"}>About</Link>
        <Link to={"/Journals"}>Journals</Link>
        <Link to={"/Profile"} className='w-[10%] h-[55%] flex items-center justify-center gap-2 bg-black rounded-full text-white'><IoPersonCircle className=' text-2xl' />{user}<IoMdArrowDropdown className='text-xl' /></Link>
    </nav>
  )
}
