import './App.css'
import { useState } from 'react'
import NavBar from './Components/NavBar'
import { Outlet} from 'react-router-dom'
import Footer from './Components/Footer'


function App() {
  const[search,setSearch] = useState("")
  const[user,setUser] = useState("Profile")
  return (
    <div className='App'>
      <NavBar setSearch={setSearch} user={user}/>
      <Outlet context={[search,setSearch,setUser]}/>
      <Footer/>
    </div>
  )
}

export default App
