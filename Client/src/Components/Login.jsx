import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { loginValidation } from "../UtilFunctions/verifyCredentials";
import Alert from "react-bootstrap/Alert";
import Cookies from 'js-cookie'

const Login = () => {
  // const [setUser] = useOutletContext()
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    if (!loginValidation(email, password)) {
      setAlert(true);
      return;
    }

    fetch(`${import.meta.env.VITE_LOCALHOST}/api/Login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Cookies.set('authStatus',data.user)
        navigate('/journals')
      })
      .catch((err) => {
        setAlert(true)
        console.log(err)
      });
  };

  return (
    <>
      {alert && (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          Input valid login credentials
        </Alert>
      )}
      <div className="login-container">
        <div className="login-box">
          <div className="login-left">
            <img className="login-img" src="/login.jpg" />
          </div>
          <form className="login-right" onSubmit={handleLogin}>
            <div className="login-top">
              <p className="login-head">Login</p>
              <p>Welcome back!</p>
            </div>
            <div className="login-inputs">
              <div className="input1">
                <p>Email</p>
                <input type="text" placeholder="Your Email"></input>
              </div>
              <div className="input2">
                <p>Password</p>
                <input type="password" placeholder="Your Password"></input>
              </div>
            </div>
            <div className="login-bottom">
              <button className="login-btn">Login</button>
              <p>
                New User?{" "}
                <Link to="/signup" className="text-[#c9f471]">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
