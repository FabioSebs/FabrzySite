import React from 'react'


const ProjectCard = ({ title, gif, desc }) => {
    return (
        <div className='flex justify-center rounded-md bg-slate-200 my-5 md:w-3/5 w-5/6 h-64 overflow-hidden border-[2px] transition-all duration-300 hover:border-green-300 '>
            <div className='w-1/2'>
                <h1 className="md:text-[30px] sm:text-[20px] italic font-bold my-3">{title}</h1>
                <h5 className='sm:text-[15px] text-[10px] italic mx-4 font-extralight'>{desc}</h5>
            </div>

            <div className='w-1/2'>
                <a href="https://fabioespinoza.netlify.app/"><img src={gif} alt="proj1" className="h-full" /></a>
            </div>

        </div>
    )
}

export default ProjectCard