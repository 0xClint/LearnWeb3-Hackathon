"use client";
import { Header, Footer } from "@/components";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Question = () => {
  return (
    <div>
      <div className="bg-purple-gray py-4 my-5 mx-20 rounded-3xl">
        <Header />
      </div>
      <div className="flex mx-32">
        <div className="w-full flex flex-col gap-6">
          <div className="p-8 border border-[#FFBBDA] rounded-xl bg-[#FEEAF3] text-left">
            <h2 className="text-[1.7rem]  font-semibold">
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam?
            </h2>

            <div className="flex gap-3 my-6">
              <div className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-[#6F6698] bg-purple-light font-semibold">
                about us
              </div>
              <div className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-[#6F6698] bg-purple-light font-semibold">
                about us
              </div>
              <div className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-[#6F6698] bg-purple-light font-semibold">
                about us
              </div>
            </div>

            <div className="asked-section make-flex justify-between">
              <div className="make-flex gap-2">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn bg-purple text-white"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  <FaRegEdit />
                  Answer
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click on ✕ button to close
                    </p>
                  </div>
                </dialog>
                <div className="text-[#858295] text-sm">Asked 7 days ago</div>
              </div>
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
          <div className="divider divider-start my-0">Answers</div>
          <div className="flex flex-col gap-5">
            <div className="py-5 px-8 border border-purple rounded-xl text-left">
              <div className="asked-section make-flex justify-between">
                <div className="avatar make-flex gap-2">
                  <div className="w-11 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                  <div className="h-10 make-flex">
                    <p className="m-0 leading-5 text-sm font-semibold">Alice</p>
                    <p className="m-0 leading-5 text-xs">2yr</p>
                  </div>
                </div>
                <div className="text-[#858295] text-sm">
                  answered 5 days ago
                </div>
              </div>
              <p className="my-4">
                Pinterest is a place where people re-display images that they've
                collected from the web. I personally find it maddening. When I
                search for images, I usually need the info that's meant to be
                attached to it. Or, I need the source/authorship. Pinterest, by
                contrast, is about as useful as a gradeschooler's photo collage.
                Why do Pinterest images need to be in web searches at all?
                Presumably, the original photo and information are out there
                somewhere… probably on page 17 of Google, after all the
                Pinterest items.
              </p>
            </div>
            <div className="py-5 px-8 border border-purple rounded-xl text-left">
              <div className="asked-section make-flex justify-between">
                <div className="avatar make-flex gap-2">
                  <div className="w-11 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                  <div className="h-10 make-flex">
                    <p className="m-0 leading-5 text-sm font-semibold">Alice</p>
                    <p className="m-0 leading-5 text-xs">2yr</p>
                  </div>
                </div>
                <div className="text-[#858295] text-sm">
                  answered 5 days ago
                </div>
              </div>
              <p className="my-4">
                photo and information are out there somewhere… probably on page
                17 of Google, after all the Pinterest items.
              </p>
            </div>
            <div className="py-5 px-8 border border-purple rounded-xl text-left">
              <div className="asked-section make-flex justify-between">
                <div className="avatar make-flex gap-2">
                  <div className="w-11 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                  <div className="h-10 make-flex">
                    <p className="m-0 leading-5 text-sm font-semibold">Alice</p>
                    <p className="m-0 leading-5 text-xs">2yr</p>
                  </div>
                </div>
                <div className="text-[#858295] text-sm">
                  answered 5 days ago
                </div>
              </div>
              <p className="my-4">
                Pinterest is a place where people re-display images that they've
                collected from the web. I personally find it maddening. When I
                search for images, I usually need the info that's meant to be
                attached to it after all the Pinterest items.
              </p>
            </div>
            <div className="py-2 text-[1.3rem] cursor-pointer border border-purple rounded-md text-purple make-flex">
              <IoMdAdd />
            </div>
          </div>
        </div>
        <div className="ml-5 w-[350px] make-flex justify-start flex-col gap-5 text-center">
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
