import React from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const ProjectProps = [
  {
    title: "Portfolio Website #1",
    gif: "https://media.giphy.com/media/Y7WMWl7CL4CQYp139Q/giphy.gif",
    desc: "My first attempt at a portfolio website with React. I was expirementing with styling, responsivenes, client side rendering, and react hooks for the very first time"
  },
  {
    title: "Djikstra VS A-Star",
    gif: "https://media.giphy.com/media/fchbIhjqvfu84rxLqi/giphy.gif",
    desc: "I was expirementing with algorithms and creating complex logic in order for the animation to work. This was another React Project and making sure positions were mapped to every cell in the grid using an equation and states was quite challenging. Very satisfying once it worked!"
  },
  {
    title: "Graph Visualizer in Go",
    gif: "https://media.giphy.com/media/PNdsrwR1bt7kcYNxkr/giphy.gif",
    desc: "Using Go's amazing packages to create beautiful diagrams and responsive graphs to show how nodes are connected and how they would show on a graph if they were undirected or directed. The map was always a bit buggy so I couldn't ever perfect the map."
  },
  {
    title: "NFT Collection Website",
    gif: "https://media.giphy.com/media/twKVZvpSXActmi7Shp/giphy.gif",
    desc: "I was in charge of creating a website for an NFT Collection Organization! I also used tools like CandyMachineV2 to have users connect their wallets, mint NFTS, and have presale on the NFTS. Sadly this project never rose up out of the grounds and crypto took a big hit, I dont recommend purchasing NFTs and was only a developer on this project never an ambassador. "
  },
  {
    title: "SENYUM",
    gif: "https://media.giphy.com/media/Y7WMWl7CL4CQYp139Q/giphy.gif",
    desc: "My first React Native project that I am very proud of. This is the first company that has paid me well and was very excited to work with everyday! SENYUM is a donation platform application that is aimed to reduce household food wastage in Jakarta, Indonesia."
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
          return <ProjectCard title = { proj.title } gif = { proj.gif } desc= {proj.desc}/>
        })}
      </div>
    </div>
  );
}

export default portfolio;
