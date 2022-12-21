import React from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const ProjectProps = [
  {
    title: "Portfolio Website #1",
    gif: "https://media.giphy.com/media/Y7WMWl7CL4CQYp139Q/giphy.gif",
  },
  {
    title: "Djikstra VS A-Star",
    gif: "https://media.giphy.com/media/fchbIhjqvfu84rxLqi/giphy.gif"
  },
  {
    title: "Graph Visualizer in Go",
    gif: "https://media.giphy.com/media/PNdsrwR1bt7kcYNxkr/giphy.gif"
  },
  {
    title: "NFT Collection Website",
    gif: "https://media.giphy.com/media/twKVZvpSXActmi7Shp/giphy.gif"
  },
  {
    title: "Portfolio Website #2",
    gif: "https://media.giphy.com/media/Y7WMWl7CL4CQYp139Q/giphy.gif"
  }
]

function portfolio() {
  return (
    <div>
      <Navbar />
      {/* Content */}
      <div className="relative w-full h-full flex flex-col justify-center text-center items-center">

        {/* Title */}
        <h1 className="md:text-[60px] text-[50px]">My Projects</h1>

        {/* Projects */}
        {ProjectProps.map(proj => {
          return <ProjectCard title = { proj.title } gif = { proj.gif } />
        })}
      </div>
    </div>
  );
}

export default portfolio;
