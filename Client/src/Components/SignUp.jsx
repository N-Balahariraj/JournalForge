import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { registerValidation } from "../UtilFunctions/verifyCredentials";
import Alert from "react-bootstrap/Alert";
import { BeatLoader } from "react-spinners";

const Signup = () => {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {alert && (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          {alert}
        </Alert>
      )}
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-left">
            <h2 className=" text-3xl font-semibold">Sign up</h2>
            <form
              className="signup-content"
              onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target[0].value;
                const email = e.target[1].value;
                const password = e.target[2].value;
                const isValidCredits = registerValidation(
                  name,
                  email,
                  password
                );
                if (!isValidCredits) {
                  setAlert(isValidCredits);
                  return;
                }
                const status = await register(name, email, password);
                setUser(status.name)
                setAlert(`Welcome ${status.name} to JournalForge`);
              }}
            >
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
              <button className="signup-btn bg-[#c9f471]" type="submit" disabled={loading} onClick={()=>setLoading(true)}>
              {loading?<BeatLoader size={10} loading={loading} /> : <span>login</span> }
                
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
