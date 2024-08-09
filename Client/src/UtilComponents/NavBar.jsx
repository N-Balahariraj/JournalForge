import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import { MdEdit, MdLogin, MdLogout } from "react-icons/md";
import Cookie from "js-cookie";
import { Button } from "react-bootstrap";
import { logout } from "../UtilFunctions/users.api";

export default function NavBar({ setSearchText }) {
  const location = useLocation();
  const navigate = useNavigate();
  const authStatus = Cookie.get("authStatus");
  const user = JSON.parse(localStorage.getItem("user"))?.name;
  return (
    <nav className="Navbar">
      <span className="w-[5%] h-[50%] text-center text-2xl font-bold">JF</span>
      {location.pathname === "/journals" && (
        <div className="w-[40%] h-[50%] flex items-center justify-around overflow-hidden border-2 border-black rounded-full">
          <input
            type="text"
            className="w-[90%] border-none outline-none"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <FaSearch />
        </div>
      )}
      <Link
        to={"/publish"}
        className="w-[10%] flex items-center justify-center gap-3 rounded-full p-2 bg-[#caf173]"
      >
        <IoIosJournal />
        <span>Publish</span>
      </Link>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/journals"}>Journals</Link>
      <SplitButton
        id="nav-dropdown"
        title={
          <Link to={"/profile"} className="flex items-center gap-2">
            <IoPersonCircle className="text-2xl" /> {user || "Profile"}
          </Link>
        }
      >
        <Dropdown.Item
          as={Link}
          to="/profile"
          className="flex items-center gap-2 hover:bg-[#caf173]"
        >
          <MdEdit />
          Profile
        </Dropdown.Item>
        {authStatus ? (
          <Dropdown.Item
            as={Button}
            variant='danger'
            className="flex items-center gap-2 hover:bg-[#caf173]"
            onClick={(e) => {
              e.preventDefault();
              logout();
              navigate('/')
            }}
          >
            <MdLogout />
            Logout
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            as={Link}
            to="/login"
            className="flex items-center gap-2 hover:bg-[#caf173]"
          >
            <MdLogin />
            Login
          </Dropdown.Item>
        )}
      </SplitButton>
    </nav>
  );
}
