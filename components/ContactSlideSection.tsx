import React, { useContext, useEffect } from "react";
import { ContactSection } from "../context/ContactSection";

const ContactSlideSection = () => {
  // const { section, setSection } = useContext(ContactSection);

  switch (section) {
    case "email":
      return (
        <div className="w-full h-[700px] bg-blue-500 relative top-10"></div>
      );
      break;
    case "twitter":
      return (
        <div className="w-full h-[700px] bg-yellow-300 relative top-10"></div>
      );
      break;
    case "linkedin":
      return (
        <div className="w-full h-[700px] bg-red-500 relative top-10"></div>
      );
      break;
    case "chat":
      return (
        <div className="w-full h-[700px] bg-orange-400 relative top-10"></div>
      );
      break;
    case "help":
      return (
        <div className="w-full h-[700px] bg-lime-300 relative top-10"></div>
      );
      break;
    default:
      return <div className="w-full h-[700px] bg-white relative top-10"></div>;
  }
};

export default ContactSlideSection;
