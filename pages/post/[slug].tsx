// post.js
import sanityClient from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import groq from "groq";
import { useEffect } from "react";
const urlFor = (source) => {
  return imageUrlBuilder(sanityClient).image(source);
};

const Post = ({ post }) => {
  // destructuring + default values
  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    body = [],
  } = post;
  
  return (
    <article className="w-full flex">
      {/* LEFT */}
      <div className="md:w-[50%] w-[80%] outline outline-1 flex flex-col items-center pt-[120px] gap-5">
        <div className="flex-col justify-center items-center relative hover:cursor-pointer">
          <span className="absolute md:h-[30%] w-[100%] bg-black z-40 text-white top-16 left-[0px] flex items-end justify-end md:text-[15px] text-[10px]">
            Fabrzy
          </span>
          <Image src="/snapSelf.png" width={50} height={75} className="z-20" />
        </div>
        <div>
          <HomeIcon className="text-gray-400 hover:text-black hover:cursor-pointer lg:scale-150 scale-95" />
        </div>
        <div>
          <InfoIcon className="text-gray-400 hover:text-black hover:cursor-pointer lg:scale-150 scale-95" />
        </div>
      </div>

      {/* MIDDLE */}
      <div className="px-10">
        <h1 className="text-[30px] font-bold mt-20">{title}</h1>
        <div className="gap-10 bg-slate-500 inline-flex text-white mb-20">
          <div>
            <span>By {name}</span>
            {categories && (
              <ul>
                {categories.map((category) => (
                  <li key={category}>Posted in {category}</li>
                ))}
              </ul>
            )}
          </div>
          {authorImage && (
            <div>
              <img src={urlFor(authorImage).width(50).url()} />
            </div>
          )}
        </div>
        {body.map((text) => {
          // IMAGES OF THE BODY
          if (text.asset) {
            const image = text.asset._ref;
            return <img src={urlFor(image).width(800).url()} />;
          }

          // TEXT OF THE BODY
          switch (text.style) {
            case "h3":
              return (
                <h3 className="font-bold text-[30px]">
                  {text.markDefs[0]?._type == "link" ? (
                    <a href={text.markDefs[0]?.href}>{text.children[0].text}</a>
                  ) : (
                    text.children[0].text
                  )}
                </h3>
              );
            case "normal":
              return (
                <h3 className="text-[20px] mb-10">
                  {text.children.map((child, idx) => {
                    let i = 0;

                    const increment = () => {
                      i++;
                    };

                    return child.marks.length ? (
                      <a
                        href={text.markDefs[i]?.href}
                        className="text-green-600 underline"
                      >
                        {child.text}
                        {increment()}
                      </a>
                    ) : (
                      child.text
                    );
                  })}
                </h3>
              );
            case "blockquote":
              return (
                <h3 className="text-[20px] bg-black text-green-600 px-5 py-3">
                  {text.children[0].text}
                </h3>
              );
            default:
              break;
          }
        })}
      </div>

      {/* RIGHT */}
      <div className="w-[50%] outline outline-1"></div>
    </article>
  );
};


export async function getStaticPaths() {
  // GETS ALL SLUGS IN THE BLOGS POSTS
  const paths = await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  // RETURNING TO GETSTATICPROPS
  return {
    // THIS IS HOW TO MAP THROUGH MANY ACCEPTED PARAMS VERY CLEANLY
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // query from groq
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    "authorImage": author->image,
    body
  }`;
  
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await sanityClient.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
}

export default Post;
