import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components";

const Question = () => {
  return (
    <div>
      <div className="bg-purple-gray py-4 m-5 rounded-3xl">
        <Header />
      </div>
      <div className="flex mx-32">
        <div className="py-5 px-8 border border-purple rounded-xl w-full text-left">
          <h2 className="text-[1.5rem]  font-semibold">
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam?
          </h2>

          <div className="flex gap-3 my-3">
            <div className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-purple bg-purple-light font-semibold">
              about us
            </div>
            <div className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-purple bg-purple-light font-semibold">
              about us
            </div>
            <div className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-purple bg-purple-light font-semibold">
              about us
            </div>
          </div>
        </div>
        <div className="ml-10 w-[350px] ">
          <div className="bg-[#CEC7F4] rounded-3xl p-10 border border-purple">
            <h2 className="text-[2rem] font-bold leading-9 ">Time Remaining</h2>

            <span className="countdown font-mono text-2xl my-3">
              <span style={{ "--value": 10 }}></span>h:
              <span style={{ "--value": 24 }}></span>m:
              <span style={{ "--value": 26 }}></span>s
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Question;
