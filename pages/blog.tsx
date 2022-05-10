import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import sanityClient from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import BlogCard from "../components/BlogCard";
import { Post, Category } from "../typings";
import Footer from "../components/Footer";

interface Props {
  posts: [Post];
  categories: [Category];
}

const imageBuilder = imageUrlBuilder(sanityClient);

const categoryIDS = {
  Gaming: "9dad9f9a-6019-4a3f-aef6-682c87cdc9be",
  YouTube: "e1c3c49c-209a-43ed-bebc-dcfb0eed799c",
  Educative: "f05cd23e-ee6b-40c7-9117-0808e3bc2184",
  General: "f991f534-662d-4dae-9614-343fef80c9cc",
}

const url = (source) => {
  return imageBuilder.image(source);
};

const blog = ({ posts, categories }: Props) => {
  const [cat, setCat] = useState('General');

  // LOGGING
  // useEffect(() => {
  //   console.table(categories);
  //   console.table(posts);
  // }, []);

  useEffect(() => {
    console.log(cat);
  }, [cat])
  return (

    <div>
      <Navbar />

      {/* Filter Dropdown */}
      <div>
        <select className="ml-4 bg-slate-100 rounded-md hover:bg-slate-300 transition-all duration-150 px-2 hover:text-white mt-2" onChange={e => setCat(e.currentTarget.value)}>
          {categories.map(category => {
            return (
              <option selected>{category.title}</option>
            )
          })}
        </select>
      </div>
      <div className="flex relative flex-wrap justify-center">
        {posts.map((post) => {
          try{
            console.log(post?.categories[0]._ref)
            switch (post?.categories[0]._ref) {
              case categoryIDS.Educative:
                return (<div>
                  {categoryIDS[cat] == categoryIDS.Educative ?
                    <BlogCard
                      image={url(post.mainImage.asset._ref)}
                      title={post.title}
                      slug={post.slug.current}
                    />
                    :
                    undefined
                  }
                </div>);
              case categoryIDS.YouTube:
                return (<div>
                  {categoryIDS[cat] == categoryIDS.YouTube ?
                    <BlogCard
                      image={url(post.mainImage.asset._ref)}
                      title={post.title}
                      slug={post.slug.current}
                    />
                    :
                    undefined
                  }
                </div>);
              case categoryIDS.Gaming:
                return (<div>
                  {categoryIDS[cat] == categoryIDS.Gaming ?
                    <BlogCard
                      image={url(post.mainImage.asset._ref)}
                      title={post.title}
                      slug={post.slug.current}
                    />
                    :
                    undefined
                  }
                </div>);
              case categoryIDS.General:
                return (
                  <div>
                    {categoryIDS[cat] == categoryIDS.General ?
                    <BlogCard
                      image={url(post.mainImage.asset._ref)}
                      title={post.title}
                      slug={post.slug.current}
                    />
                    :
                    undefined
                  }
                  </div>
                )
              default:
                return (
                  <div>
                  </div>
                );
            }
          }
          catch(e) {
            console.log(e)
          }
          
          
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
    slug,
    categories,
  }`;

  const catQuery = `*[_type=="category"]`

  const posts = await sanityClient.fetch(query);
  const categories = await sanityClient.fetch(catQuery);
  console.log(categories);
  return {
    props: {
      posts,
      categories,
    },
  };
};
