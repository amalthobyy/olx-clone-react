import React, { useState, useEffect, useCallback } from "react";
import { auth } from '../../firebase.js';
import './Login.css'
import logo from '../../assets/logo.png';
import { onAuthStateChanged } from "firebase/auth";
import { login,signup } from '../../firebase.js';
import {useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

    const [signState,setSignState]= useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState("");


    const SetName = useCallback((event) => {
      setName(event.target.value);
      console.log("function rendered");
    },[])
  
    const SetEmail = useCallback((event) => {
      setEmail(event.target.value);
      console.log("function rendered");
    },[])
  
    const SetPassword = useCallback((event) => {
      setPassword(event.target.value);
      console.log("function rendered");
    },[])
  
    const user_auth = async (event) => {
      event.preventDefault();
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    };

    
  return (
    <div className="login">
    <div className="login-form">
     
      <img 
        src={logo} 
        alt="App Logo" 
        className="login-logo-form" 
      />

      <h1>{signState}</h1>
      <form>
        {signState === "Sign Up" && (
          <input
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            placeholder="Enter Your Name"
            style={{ border: '1px solid black' }}
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder="Enter Your Email"
          style={{ border: '1px solid black' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          placeholder="Enter Your Password"
          style={{ border: '1px solid black' }}
        />
        <button onClick={user_auth} type="submit">
          {signState}
        </button>
       
      </form>
      <div className="form-switch">
        {signState === "Sign In" ? (
          <p>
            New to OLX?{" "}
            <span
              onClick={() => {
                setSignState("Sign Up");
              }}
            >
              Sign Up Now
            </span>
          </p>
        ) : (
          <p>
            Already Have an Account?{" "}
            <span
              onClick={() => {
                setSignState("Sign In");
              }}
            >
              Sign In Now
            </span>
          </p>
        )}
      </div>
    </div>
  </div>
  );
};

export default Login;
