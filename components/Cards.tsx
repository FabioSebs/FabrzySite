import React, { useEffect } from "react";
import Image from "next/image";

const Cards = ({ title, image, description, action, link, glow }) => {
  return (
    <div
      className={`lg:w-[900px] lg:h-[350px] sm:w-[600px] sm:h-[250px] w-[400px] h-[150px] bg-gradient-to-r from-white to-gray-400 rounded-3xl flex justify-start overflow-hidden transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 ${glow}`}
    >
      {/* Image */}
      <div className="h-full lg:w-[400px] w-[300px] relative">
        <Image src={image} layout="fill" />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-4 basis-1/3 ml-9">
        {/* Title */}
        <div className="flex justify-start items-center lg:text-[30px] sm:text-[25px] basis-1/4">
          <h1> {title} </h1>
        </div>

        {/* Description */}
        <h1 className="lg:text-[20px] md:text-[15px] basis-1/2">
          {description}
        </h1>

        {/* Button */}
        <button className="bg-[rgba(255,255,255,.5)] hover:bg-white duration-300 relative bottom-6 py-[3px]">
          <a href={link}>{action}</a>
        </button>
      </div>
    </div>
  );
};

export default Cards;
