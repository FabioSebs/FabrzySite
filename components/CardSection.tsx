import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CookiesProvider, useCookies } from "react-cookie";

const cardInfo = [
  {
    title: "YouTube",
    image: "/Youtube.png",
    description:
      "Subscribe to my YouTube Channel! Videos on Travel, Computer Science, and Vlogs will be uploaded monthly",
    action: "Subscribe",
    link: "https://www.youtube.com/channel/UCQyw-ckts9K_ng1fGQvHyoA",
    glow: "shadow-glow-red",
    // icon: YouTubeIcon,
  },
  {
    title: "Instagram",
    image: "/instagram.png",
    description:
      "Get to know me better on Instagram and take a look at my life!",
    action: "Follow",
    link: "https://www.instagram.com/compsciatbinus/",
    glow: "shadow-glow-blue",
    // icon: InstagramIcon,
  },
  {
    title: "Twitch",
    image: "/twitch.PNG",
    description:
      "Follow my Gaming Channel on Twitch! We're top 5000 NA East in Valorant!",
    action: "Follow",
    link: "https://www.twitch.tv/fabrzy",
    glow: "shadow-glow-purple",
    // icon: TwitterIcon,
  },
];

const CardSection = () => {
  const { ref, inView } = useInView();
  const [cookies, setCookie, removeCookie] = useCookies(["firstTime"]);
  const [time, setTime] = useState(cookies.firstTime ? 2000 : 5000);
  const animation = useAnimation();

  useEffect(() => {
    setTimeout(() => {
      animation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1.5,
          bounce: 0.5,
        },
      });
    }, time);
  }, []);

  return (
    <motion.div
      initial={{ x: "-150vh" }}
      animate={animation}
      className="sm:h-[1300px] h-[800px] w-full bg-white flex flex-col md:gap-[30px] gap-[80px] justify-center items-center"
    >
      {cardInfo.map((card) => {
        return (
          <div ref={ref}>
            <Cards
              title={card.title}
              image={card.image}
              description={card.description}
              action={card.action}
              link={card.link}
              glow={card.glow}
              key={card.title}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default CardSection;
