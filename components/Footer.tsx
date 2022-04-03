import React, { useState, useEffect } from "react";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-full h-[70px] flex justify-between px-8 bg-white relative items-center top-[150px]">
      <h1 className="text-[15px]">
        <MobileScreenShareIcon /> Mobile App Coming Soon!
      </h1>
      <h1>
        <CopyrightIcon /> {date.toUTCString().slice(0, 17)}
      </h1>
    </div>
  );
};

export default Footer;
