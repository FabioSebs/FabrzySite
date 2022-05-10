import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar";
import * as bcrypt from "bcryptjs";
import {hashPWD} from "../bcrypt"

const signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const signUpRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8080/signup", {
        username: username,
        email: email,
        password: hashPWD(password),
        birthdate: dob,
      });
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex-col justify-center">
        <Navbar />
        <div className="lg:w-[300px] w-[300px] lg:h-[600px] h-[600px] bg-black text-white flex flex-col justify-center align-middle gap-3 px-10 z-10 mx-auto relative top-10 mb-10">
          <h1 className="ml-auto mr-auto text-[40px]">SIGN UP</h1>
          <label> Username:</label>
          <input
            className="text-black px-3"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label> Email:</label>
          <input
            className="text-black px-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label> Password:</label>
          <input
            type="password"
            className="text-black px-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label> Confirm Password:</label>
          <input
            type="password"
            className="text-black px-3"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label> Date of Birth:</label>
          <input
            type="date"
            className="text-black"
            onChange={(e) => setDob(e.target.value)}
          />

          <Link href="/login">
            <button className="bg-green-400 text-white hover:cursor-pointer">
              Login!
            </button>
          </Link>

          <button className="bg-yellow-300 text-black hover:cursor-pointer" onClick={signUpRequest}>
            Sign Up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default signup;
