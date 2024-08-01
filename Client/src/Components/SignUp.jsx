import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { registerValidation } from "../UtilFunctions/verifyCredentials";
import Alert from "react-bootstrap/Alert";

const Signup = () => {
  const [user, setUser] = useOutletContext();
  const [alert, setAlert] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;

    if (!registerValidation(name, email, password)) {
      setAlert(true);
      return;
    }

    fetch(`${process.env.REACT_APP_LOCALHOST}/api/Register`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data.name));
  };

  return (
    <>
      {alert && (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          Input valid Credentials !!!
        </Alert>
      )}
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-left">
            <h2 className=" text-3xl font-semibold">Sign up</h2>
            <form className="signup-content" onSubmit={handleSignUp}>
              <div className="group">
                <p>Name:</p>
                <input type="text" placeholder="Your Name"></input>
              </div>
              <div className="group">
                <p>email:</p>
                <input type="text" placeholder="Your Email"></input>
              </div>
              <div className="group">
                <p>Password:</p>
                <input type="password" placeholder="Your Password"></input>
              </div>
              <button className="signup-btn bg-[#c9f471]" type="submit">
                Register
              </button>
              <div className="group">
                <p>
                  Already have an account?{" "}
                  <Link to="/Login" className="text-[#c9f471]">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="signup-right">
            <img className="login-img" src="/login.jpg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
