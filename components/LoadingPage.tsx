import React, { useEffect, useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Image from "next/image";
import { gsap } from "gsap";
import { useCookies } from "react-cookie";

const LoadingPage = () => {
  // STATES - HOOKS
  const wholePage = useRef();
  const description = useRef();
  const [loaded, setLoaded] = useState(true);
  const [gsapAni, setGsapAni] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["firstTime"]);

  // GSAP - ANIMATIONS
  const q = gsap.utils.selector(description);

  const fadeOut = () => {
    wholePage?.current?.addEventListener("animationend", () =>
      wholePage?.current.classList.add("hidden")
    );
    return "animate-fadeOut";
  };

  const monthFromNow = () => {
    let today = new Date();
    today.setMonth(today.getMonth() + 1);
    return today;
  };

  useEffect(() => {
    if (cookies.firstTime) {
      wholePage.current.classList.add("hidden");
    } else {
      // GSAP ANIMATION
      setTimeout(() => {
        description.current.classList.remove("opacity-0");
        setGsapAni(false);
        description.current = gsap
          .timeline()
          .to(q(".desc"), {
            scaleY: 0.3,
          })
          .to(q(".desc"), {
            scaleY: 1,
          });
      }, 2000);

      // FADEOUT EFFECT
      setTimeout(() => {
        setLoaded(false);
        //SET COOKIE
        setCookie("firstTime", 1, { path: "/", expires: monthFromNow() });
      }, 4000);
    }
  }, []);

  return (
    <div
      ref={wholePage}
      className={`h-full w-full absolute text-center flex justify-center items-center flex-col transition-all duration-300 ${loaded ? "animate-fadeIn" : fadeOut()
        } z-20 bg-[#f6f3f3]`}
    >
      {/* Content */}
      <div className="flex flex-col items-center justify-center mb-[80px]">
        <div className="bg-[#FF2E2E] w-[210px] h-[210px] rounded-full border flex justify-center items-center">
          <Image
            src={"/FabioTeacher.jpg"}
            width={200}
            height={200}
            className="rounded-full p-4 stroke-white"
          />
        </div>
        <h1 className="md:text-[3rem] text-[2rem] text-gray-700">
          {" "}
          Fabio Espinoza{" "}
        </h1>
      </div>

      {/* Loader */}
      <BeatLoader color={"#FF2E2E"} loading={true} size={20} />

      {/* Extra Info */}
      <div
        className={`flex justify-between ${gsapAni ? "opacity-0" : "animate-fadeIn"
          } text-gray-700`}
        ref={description}
      >
        <h1 className="md:w-[400px] w-[110px] relative md:text-[30px] desc">
          Full Stack Dev
        </h1>
        <h1 className="md:w-[400px] w-[110px] relative md:text-[30px] desc">
          Content Creator
        </h1>
        <h1 className="md:w-[400px] w-[110px] relative md:text-[30px] desc">
          Gamer
        </h1>
      </div>
    </div>
  );
};

export default LoadingPage;
