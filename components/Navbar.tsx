import React, { useState } from "react";
import Link from "next/link";
import GamepadIcon from "@mui/icons-material/Gamepad";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

let Links = [
  { name: "HOME", link: "/" },
  { name: "PORTFOLIO", link: "/portfolio" },
  // { name: "LOGIN", link: "/login" },
  { name: "BLOG", link: "/blog" },
  // { name: "CONTACT", link: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full top-0 left-0 z-[100] block relative">
      {/* Navbar */}
      <div className="md:flex items-center justify-between bg-[#ffffff] py-1 md:px-10 px-7">
        {/* Logo */}
        <Link href="/">
          <div className="font-bold  text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800 relative">
            <Image
              src="/snapSelf.png"
              width={50}
              height={75}
              className="z-20"
            />
            <h1 className="text-white z-20">
              F<span className="text-[17px] relative">ABRZY</span>
            </h1>
            <span className="absolute w-[130px] h-[25px] bg-black z-10"></span>
          </div>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {!open ? <MenuIcon /> : <CloseIcon />}
        </div>

        {/* Nav Elements */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-0 absolute md:static bg-[#ffffff] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open
              ? "top-20 opacity-100"
              : "top-[-490px] md:opacity-100 opacity-0"
          }`}
        >
          {Links.map((link) => {
            return (
              <li
                key={link.name}
                className="md:ml-8 lg:text-[18px] text-[13px] md:my-0 my-7 "
              >
                <Link href={link.link}>
                  <a className="text-black hover:text-gray-400 duration-200">
                    {" "}
                    {link.name}
                  </a>
                </Link>
              </li>
            );
          })}
          {/* <Button text="LOGIN" /> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
