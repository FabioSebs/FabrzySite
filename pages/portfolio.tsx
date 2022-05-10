import React from "react";
import Navbar from "../components/Navbar";

function portfolio() {
  return (
    <div>
      <Navbar />
      <div className="w-full h-full flex-col justify-center text-center">
        <h1 className="md:text-[60px] text-[50px]">My Projects</h1>
        <li className="list-none">
          <ul>
            <div>
            <h1 className="md:text-[50px] text-[30px]">Portfolio Website #1</h1>
            <a href="https://fabioespinoza.netlify.app/"><img src="https://media.giphy.com/media/Y7WMWl7CL4CQYp139Q/giphy.gif" alt="proj1" className="mx-auto md:scale-150 scale-100 md:py-32" /></a>
            </div>
          </ul>
          <ul>
          <div>
            <h1 className="md:text-[50px] text-[30px]">Graph Pathfinder Djikstra VS A-Star</h1>
            <a href="https://fabioespinoza.netlify.app/"><img src="https://media.giphy.com/media/fchbIhjqvfu84rxLqi/giphy.gif" alt="proj1" className="mx-auto md:scale-150 scale-100 md:py-32"/></a>
            </div>
          </ul>
          <ul>
          <div>
            <h1 className="md:text-[50px] text-[30px]">Graph Visualizer Made in Go</h1>
            <a href="https://fabioespinoza.netlify.app/"><img src="https://media.giphy.com/media/PNdsrwR1bt7kcYNxkr/giphy.gif" alt="proj1"  className="mx-auto md:scale-150 scale-100 md:py-32"/></a>
            </div>
          </ul>
          <ul>
          <div>
            <h1 className="md:text-[50px] text-[30px]">NFT Collection Website</h1>
            <a href="https://fabioespinoza.netlify.app/"><img src="https://media.giphy.com/media/twKVZvpSXActmi7Shp/giphy.gif" alt="proj1"  className="mx-auto md:scale-150 scale-100 md:py-32"/></a>
            </div>
          </ul>
          <ul>
          <div>
            <h1 className="md:text-[50px] text-[30px]">Portfolio Website #2</h1>
            <a href="https://media.giphy.com/media/fchbIhjqvfu84rxLqi/giphy.gif"><img src="https://media.giphy.com/media/Y7WMWl7CL4CQYp139Q/giphy.gif" alt="proj1" className="mx-auto md:scale-150 scale-100 md:py-40"/></a>
            </div>
          </ul>
          </li>
          </div>
      </div>
      );
}

      export default portfolio;
