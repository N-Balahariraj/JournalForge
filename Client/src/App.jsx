// Style sheets
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Packages
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  const [searchText, setSearchText] = useState("search");
  console.log(searchText);

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
                <Journals searchText={searchText} />
              </Layout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/publish"
          element={
            <ProtectedRoute>
              <Layout>
                <Publish />
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
