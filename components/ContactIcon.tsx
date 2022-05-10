import React, { useContext } from "react";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { ContactSection } from "../context/ContactSection";

function ContactIcon() {
  const { section, setSection } = useContext(ContactSection);
  return (
    <div className="flex md:gap-10 gap-5 md:scale-150 scale-110 top-3 relative">
      <div
        onClick={(e) => setSection("email")}
        className="w-[50px] h-[50px] bg-gray-400 rounded-full relative flex justify-center items-center hover:cursor-pointer duration-300 text-white hover:text-blue-600 shadow-xl"
      >
        <EmailIcon />
      </div>
      <div
        onClick={(e) => setSection("twitter")}
        className="w-[50px] h-[50px] bg-gray-400 rounded-full relative flex justify-center items-center hover:cursor-pointer duration-300 text-white hover:text-blue-600 shadow-xl"
      >
        <TwitterIcon />
      </div>
      <div
        onClick={(e) => setSection("linkedin")}
        className="w-[50px] h-[50px] bg-gray-400 rounded-full relative flex justify-center items-center hover:cursor-pointer duration-300 text-white hover:text-blue-600 shadow-xl"
      >
        <LinkedInIcon />
      </div>
      <div
        onClick={(e) => setSection("chat")}
        className="w-[50px] h-[50px] bg-gray-400 rounded-full relative flex justify-center items-center hover:cursor-pointer duration-300 text-white hover:text-blue-600 shadow-xl"
      >
        <ChatBubbleIcon />
      </div>
      <div
        onClick={(e) => setSection("help")}
        className="w-[50px] h-[50px] bg-gray-400 rounded-full relative flex justify-center items-center hover:cursor-pointer duration-300 text-white hover:text-blue-600 shadow-xl"
      >
        <HelpCenterIcon />
      </div>
    </div>
  );
}

export default ContactIcon;
