import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/Navbar";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8080/login", {
        username: username,
        password: password,
      });
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex-col justify-center relative">
        <Navbar />
        <Image src="/loginbg.jpg" layout="fill" className="absolute z-[-10]" />
        <div className="lg:w-[450px] w-[300px] lg:h-[800px] h-[600px] bg-black text-white flex flex-col justify-center align-middle gap-5 px-10 z-10 m-auto relative top-40">
          <h1 className="ml-auto mr-auto text-[40px]">LOGIN</h1>
          <label> Username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
          />
          <label> Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="text-black"
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

export default login;
