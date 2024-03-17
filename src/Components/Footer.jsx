import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='Footer'>
        <nav className=' w-[100%] flex justify-around'>
            <Link to={"/"}>Home</Link>
            <Link to={"/About"}>About Us</Link>
            <Link to={"/Contact"}>Contact</Link>
        </nav>
        <span>© Copyright 2024 - JournalForge</span>
    </footer>
  )
}
