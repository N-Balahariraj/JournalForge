import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const Login = ({setUser}) => {

    // const [setUser] = useOutletContext()

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        fetch('http://localhost:4500/api/Login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(data => {
            setUser(data.User.name)
            console.log(data)
        })

    }

    return (
        <>
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
                            <p>New User? <Link to='/Profile' className="text-[#c9f471]">Sign up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;