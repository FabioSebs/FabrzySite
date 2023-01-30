import React from "react";
import Particles from "react-tsparticles";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://64.media.tumblr.com/43b7c06bf4469a5790aad18f8a0c352b/af669c6b67ab1000-5a/s2048x3072/a13f499a04e367ce023f04a139bc24875fe5257a.png)",
      }}
      className="md:h-96 h-72 w-screen relative bg-no-repeat bg-cover shadow-lg"
    >
      <Particles
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0,
          },
          particles: {
            number: {
              value: 50,
              limit: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "line",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.5,
                sync: false,
              },
            },
            size: {
              value: 30,
              random: true,
              anim: {
                enable: true,
                speed: 10,
                size_min: 10,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 100,
              color: "#000000",
              opacity: 1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
                parallax: {
                  enable: false,
                  force: 60,
                  smooth: 10,
                },
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                lineLinked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 50,
                duration: 2,
                opacity: 1,
                speed: 2,
              },
              repulse: {
                distance: 300,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          backgroundMask: {
            enable: false,
            cover: {
              color: {
                value: {
                  r: 0,
                  g: 0,
                  b: 0,
                },
              },
            },
          },
          retina_detect: true,
          fps_limit: 60,
        }}
        className="relative w-full h-full"
      />

      <div className="flex flex-col xl:text-[70px] lg:text-[100px] md:text-[80px] text-[60px] text-white justify-center items-start bg-transparent absolute top-[60%] left-3/4 transform -translate-x-1/2 -translate-y-2/3 hover:cursor-pointer">
        <h1 className="shadow-lg hover:shadow-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-red-500 px-8">
          Education
        </h1>
        <h1 className="shadow-lg hover:shadow-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-red-500 px-8">
          Gaming
        </h1>
        <h1 className="shadow-lg hover:shadow-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-red-500 px-8">
          Fitness
        </h1>
      </div>
    </div>
  );
};

export default Hero;
