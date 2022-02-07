import React, { useEffect, useRef, useState, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Image from "next/image";
import { gsap } from "gsap";
import { Loading } from "../context/Loading";

const LoadingPage = () => {
  // STATES - HOOKS
  const wholePage = useRef();
  const description = useRef();
  const [loaded, setLoaded] = useState(true);
  const [gsapAni, setGsapAni] = useState(true);

  // GSAP - ANIMATIONS
  const q = gsap.utils.selector(description);

  const fadeOut = () => {
    wholePage?.current?.addEventListener("animationend", () =>
      wholePage?.current.classList.add("hidden")
    );
    return "animate-fadeOut";
  };

  useEffect(() => {
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
    }, 4000);
  }, []);

  return (
    <div
      ref={wholePage}
      className={`h-screen w-screen absolute text-center flex justify-center items-center flex-col transition-all duration-300 ${
        loaded ? "animate-fadeIn" : fadeOut()
      } z-20 bg-[#f6f3f3]`}
    >
      {/* Content */}
      <div className="mb-6 flex flex-col items-center justify-center mb-[80px]">
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
        className={`flex justify-between mt-[200px] ${
          gsapAni ? "opacity-0" : "animate-fadeIn"
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
