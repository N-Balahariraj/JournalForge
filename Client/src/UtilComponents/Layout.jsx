import React, {useState} from "react";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children, setSearchText, user }) {
  return (
    <div className="App">
      <NavBar setSearchText={setSearchText} user={user} />
      {children}
      <Footer />
    </div>
  );
}
