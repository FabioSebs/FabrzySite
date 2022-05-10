import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {comparePWD} from "../bcrypt"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)
  
  const lookUp = async () => {
    try {
      const res = await axios.post("http://localhost:8080/lookup", {
        username: username
      });
      return res.data.password
    } catch (error) {
      console.log(error)
    }
  }

  const loginRequest = async (e) => {
    e.preventDefault()
    const pwd = await lookUp();
    let check = undefined
    if (pwd){
      check = comparePWD(password, pwd)
    }
    
    if (check) {
      try {
        const res = await axios.post("http://localhost:8080/login", {
          username: username,
          password: pwd,
        });
      } catch (error) {
        console.log(error);
      }
    }
    
  };

  return (
    <div>
      <div className="w-full h-screen flex-col justify-center relative">
        <Navbar />
        <div className="lg:w-[300px] w-[250px] lg:h-[450px] h-[400px] bg-black text-white flex flex-col justify-center align-middle gap-5 px-10 z-10 mx-auto relative top-14 mb-10">
          <h1 className="ml-auto mr-auto text-[40px]">LOGIN</h1>
          <label> Username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="text-black px-3"
          />
          <label> Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="text-black px-3"
            type="password"
          />

          <button
            className="bg-green-400 text-white hover:cursor-pointer"
            onClick={loginRequest}
          >
            Login!
          </button>
          <Link href="/signup">
            <button className="bg-yellow-300 text-black hover:cursor-pointer">
              Sign Up!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
