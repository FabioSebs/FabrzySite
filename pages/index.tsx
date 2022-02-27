import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/Navbar";
import { Loading } from "../context/Loading";
import React, { useState, useRef, useEffect } from "react";
import sanityClient from "../sanity";
import { Post } from "../typings";
import Hero from "../components/Hero";
import CardSection from "../components/CardSection";
import { CookiesProvider, useCookies } from "react-cookie";

interface Props {
  posts: [Post];
}

const IndexPage = ({ posts }: Props) => {
  const [loaded, setLoaded] = useState(true);
  const homePage = useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["firstTime"]);

  // ANIMATION
  const fadeIn = () => {
    return "block animate-fadeIn";
  };

  // TIMEOUT EFFECT
  useEffect(() => {
    console.log(posts);
    console.log(cookies.firstTime);
    if (cookies.firstTime == 1) {
      console.log("test");
      setLoaded(false);
    } else {
      setTimeout(() => {
        setLoaded(false);
      }, 3700);
    }
  }, []);

  // JSX
  return (
    <CookiesProvider>
      <Loading.Provider value={{ loaded, setLoaded }}>
        <LoadingPage />
        <div
          className={`${!loaded ? fadeIn() : "hidden"} overflow-hidden`}
          ref={homePage}
        >
          <Navbar />
          <Hero />
          <CardSection />
        </div>
      </Loading.Provider>
    </CookiesProvider>
  );
};

export default IndexPage;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
