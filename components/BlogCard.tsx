import React from "react";
import sanityClient from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const BlogCard = ({ image, title, slug }) => {
  return (
    <a href={`/post/${slug}`} className="group">
      <div className="bg-black h-[200px] w-[400px] relative m-4 group-hover:scale-105 transition-transform duration-200 ease-in-out">
        <h1 className="text-white bg-[rgba(0,0,0,.3)] absolute z-10 bottom-0 ml-2">
          {title}
        </h1>
        <img src={image} className="absolute h-full w-full z-0" />
      </div>
    </a>
  );
};

export default BlogCard;
