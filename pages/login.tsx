import Image from "next/image";
import React from "react";
import Welcome from "../public/welcomebg.png";
const login = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center align-middle items-center">
        <Image src="/loginbg.jpg" layout="fill" className="absolute z-[-10]" />
        <div className="lg:w-[450px] w-[300px] lg:h-[800px] h-[600px] bg-black text-white flex flex-col justify-center align-middle gap-5 px-10 z-10">
          <img src={Welcome} />
          <label> Username:</label>
          <input />
          <label> Password:</label>
          <input />
          <button className="bg-white text-black hover:cursor-pointer">
            Login!
          </button>
          <button className="bg-white text-black hover:cursor-pointer">
            Sign Up!
          </button>
        </div>
      </div>
    </>
  );
};

export default login;
