import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components";

const Question = () => {
  return (
    <div>
      <div className="bg-purple-gray py-4 m-5 rounded-3xl">
        <Header />
      </div>
      <div className="flex mx-32">
        <div className="py-10 px-8 border border-purple rounded-xl w-full h-[270px] text-left">
          <h2 className="text-[1.5rem]  font-semibold">
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam?
          </h2>

          <div className="flex gap-3 my-6">
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

          <div className="asked-section make-flex justify-between">
            <div className="text-[#858295] text-sm">Asked 7 days ago</div>

            <div className="avatar make-flex gap-1">
              <div className="w-11 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <div className="h-10 make-flex">
                <p className="m-0 leading-5 text-sm font-semibold">Alice</p>
                <p className="m-0 leading-5 text-xs">2yr</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-5 w-[350px] make-flex flex-col gap-5">
          <div className="bg-[#CEC7F4] w-full rounded-2xl p-10 border border-purple">
            <h2 className="text-[2rem] font-bold leading-9 ">Time Remaining</h2>

            <span className="countdown font-mono text-2xl my-3">
              <span style={{ "--value": 10 }}></span>h:
              <span style={{ "--value": 24 }}></span>m:
              <span style={{ "--value": 26 }}></span>s
            </span>
          </div>
          <div className="bg-[#CEC7F4] w-full rounded-2xl p-7 border border-purple">
            <p className="text-[1.5rem] font-semibold">Pool Bounty</p>

            <h2 className="text-[3rem] font-bold leading-tight make-flex gap-2 border border-[#BDBCBC] rounded-lg bg-white my-2">
              50$
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Question;
