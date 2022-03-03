// post.js
import sanityClient from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import groq from "groq";
import { useEffect } from "react";
const urlFor = (source) => {
  return imageUrlBuilder(sanityClient).image(source);
};

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
        />
      );
    },
  },
};

const Post = ({ post }) => {
  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    body = [],
  } = post;

  useEffect(() => {
    console.log(body[0].style);
    console.log(body);
  }, []);

  return (
    <article className="lg:mx-60 mx-20">
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {authorImage && (
        <div>
          <img src={urlFor(authorImage).width(50).url()} />
        </div>
      )}
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
    </article>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`;

export async function getStaticPaths() {
  // GETS ALL SLUGS IN THE BLOGS POSTS
  const paths = await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  // RETURNING TO GETSTATICPROPS
  return {
    // THIS IS HOW TO MAP THROUGH MANY ACCEPTED PARAMS VERY CLEANLY
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
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
