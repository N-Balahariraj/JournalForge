import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { loginValidation } from "../UtilFunctions/verifyCredentials";
import Alert from "react-bootstrap/Alert";
import { login } from "../UtilFunctions/users.api";

const Login = () => {
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      {alert && (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          {alert}
        </Alert>
      )}
      <div className="login-container">
        <div className="login-box">
          <div className="login-left">
            <img className="login-img" src="/login.jpg" />
          </div>
          <form className="login-right" onSubmit={async e=>{
            e.preventDefault();
            const email = e.target[0].value;
            const password = e.target[1].value;
            const isValidCredits = loginValidation(email, password)
            if (!isValidCredits) {
              setAlert(isValidCredits);
              return;
            }
            const status = await login(email,password)
            if(status.code === 200){
              navigate('/journals')
            }
            else{
              setAlert(status.message)
            }
          }}>
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
