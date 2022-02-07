import Link from "next/link";
import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/Navbar";
import { Loading } from "../context/Loading";
import React, { useState, useRef, useEffect } from "react";
import sanityClient from "../sanity";
import { Post } from "../typings";
import Hero from "../components/Hero";
import CardSection from "../components/CardSection";

interface Props {
  posts: [Post];
}

const IndexPage = ({ posts }: Props) => {
  const [loaded, setLoaded] = useState(true);
  const homePage = useRef();

  // ANIMATION
  const fadeIn = () => {
    return "block animate-fadeIn";
  };

  // TIMEOUT EFFECT
  useEffect(() => {
    console.log(posts);
    setTimeout(() => {
      setLoaded(false);
    }, 3700);
  }, []);

  // JSX
  return (
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
