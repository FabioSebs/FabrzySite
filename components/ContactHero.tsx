import React from "react";
import Image from "next/image";
import ContactImage from "../public/portrait.PNG";

function ContactHero() {
  return (
    <div className="w-full md:h-[700px] h-[500px] bg-emerald-300 relative overflow-hidden">
      {/* Main Rectangle in Hero */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[70%] w-[50%] lg:h-[70%] h-[50%] border-8 flex justify-center items-center z-20">
        <div className="w-[90%] h-[90%] bg-white flex justify-center items-center flex-col">
          <Image
            src={ContactImage}
            width={200}
            height={200}
            className="rounded-[200%]"
          />

          <h1 className="text-[1rem] md:text-[2rem]">Inquire Here</h1>
          <h1 className="text-[.75rem] lg:px-[100px] px-8 md:text-[1.5rem]">
            The place to contact and reach Fabrzy for any inquiries reguarding
            anything! Response may take from 1-7 business days :D
          </h1>
        </div>
      </div>

      {/* COOL rotation lines forming X */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-1 border-2 rotate-45 relative"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-1 border-2 rotate-[135deg] relative"></div>
    </div>
  );
}

export default ContactHero;
