import React from "react";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" bg-purple-gray text-white text-[1.2rem] mx-20 rounded-2xl make-flex gap-2 py-4 px-20 mt-20 mb-5">
      <FaGithub /> | Made with ❤️ at LearnWEb3-Hackathon
    </div>
  );
};

export default Footer;
