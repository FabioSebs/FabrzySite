import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import sanityClient from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import BlogCard from "../components/BlogCard";
import { Post } from "../typings";
import Footer from "../components/Footer";

interface Props {
  posts: [Post];
}

const imageBuilder = imageUrlBuilder(sanityClient);

const url = (source) => {
  return imageBuilder.image(source);
};

const blog = ({ posts }: Props) => {
  useEffect(() => {
    console.table(posts);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex relative flex-wrap justify-center">
        {posts.map((post) => {
          return (
            <div>
              <BlogCard
                image={url(post.mainImage.asset._ref)}
                title={post.title}
                slug={post.slug.current}
              />
            </div>
          );
        })}
      </div>
      {/* <BlogCard image={}/> */}
      <Footer />
    </div>
  );
};

export default blog;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    mainImage,
    title,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
