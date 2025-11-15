
import { FaGithub } from "react-icons/fa";
import Linkedin from "@/assets/social-linkedin.svg";

import Xlogo from "@/assets/social-x.svg";
export const Footer = () => {



  return <footer className="py-20 bg-black text-white text-base">
    <div className="container">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
            practice<span className="gradient-text">JS</span>
          </h1>
        

        <div className="flex mt-6 gap-6 justify-center">
          <a href="https://x.com/shridmishra" target="_blank" rel="noopener noreferrer">
            <Xlogo />
          </a>
          <a href="https://linkedin.com/in/shridmishra" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://github.com/shridmishra/practicejs" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
        <p className="mt-6">
          Developed By{' '}
          <a href="https://shrid.in/" target="_blank" rel="noopener noreferrer" className="gradient-text hover:underline">
            Shrid Mishra
          </a>
        </p>


      </div>


    </div>
  </footer>;
};
