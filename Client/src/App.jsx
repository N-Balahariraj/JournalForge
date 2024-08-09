// Style sheets
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Packages
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { refreshAccessToken } from "./UtilFunctions/auth.api"; 

//Components
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import Journals from "./Components/Journals.jsx";
import Publish from "./Components/Publish.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/SignUp.jsx";
import Layout from "./UtilComponents/Layout.jsx";
import ProtectedRoute from "./UtilComponents/ProtectedRoute.jsx";
import Profile from "./Components/Profile.jsx";
import { loadJournals } from "./Data/journalData.js";

function App() {
  const [searchText, setSearchText] = useState("");
  const [editJournal, setEditJournal] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14* 60 * 1000); 
    loadJournals()
    return () => clearInterval(interval); 
  }, []);

  // 1. How to overcome the nature of useState hook `/src/components/journals.jsx`

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        ></Route>
        <Route
          path="/journals"
          element={
            <ProtectedRoute>
              <Layout setSearchText={setSearchText} >
                <Journals searchText={searchText} setEditJournal={setEditJournal}/>
              </Layout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/publish"
          element={
            <ProtectedRoute>
              <Layout>
                <Publish editJournal={editJournal} setEditJournal={setEditJournal}/>
              </Layout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
