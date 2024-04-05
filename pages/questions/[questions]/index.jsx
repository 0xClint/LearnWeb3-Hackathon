"use client";
import { Header, Footer, CountDownRenderer } from "@/components";
import { isValidJSON } from "@/libs/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import SDK from "weavedb-sdk";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";

const Question = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const { questions } = router.query;
  console.log(questions);

  const getData = async () => {
    if (questions) {
      setLoader(true);
      const db = new SDK({ contractTxId: process.env.NEXT_PUBLIC_CONTRACT_ID });
      await db.init();
      const result = await db.get("questions", questions);
      setData(result);
      console.log(result);
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, [questions]);

  return (
    <div>
      <div className="bg-purple-gray py-4 my-5 mx-20 rounded-3xl">
        <Header />
      </div>
      <div className="flex mx-32">
        <div className="w-full flex flex-col gap-6">
          <div className="p-8 border border-[#FFBBDA] rounded-xl bg-[#FEEAF3] text-left">
            <h2 className="text-[1.7rem]  font-semibold">{data?.question}</h2>

            <div className="flex gap-3 my-2">
              {isValidJSON(data?.tags)
                ? JSON.parse(data.tags).map((item, index) => (
                    <div
                      key={index}
                      className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-purple bg-purple-light font-semibold"
                    >
                      {item}
                    </div>
                  ))
                : ""}
            </div>
            <div
              className="my-5"
              dangerouslySetInnerHTML={{ __html: data?.details }}
            />

            <div className="asked-section make-flex justify-between">
              <div className="make-flex gap-2">
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
                <div className="make-flex gap-3 mr-4 ml-3">
                  <div className="flex font-semibold gap-1">
                    <FiThumbsUp className="text-2xl cursor-pointer hover:scale-110" />
                    {data ? data.like : 0}
                  </div>
                  <div className="flex font-semibold gap-1">
                    <FiThumbsDown className="text-2xl cursor-pointer hover:scale-110" />
                    {data ? data.dislike : 0}
                    
                  </div>
                </div>

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
        <div className="ml-5 w-[350px]  text-center">
          {data?.timeBased ? (
            <div className="make-flex justify-start flex-col gap-5">
              <div className="bg-[#CEC7F4] w-full rounded-2xl p-8 border border-purple">
                <h2 className="text-[2rem] font-bold leading-9 ">
                  Time Remaining
                </h2>
                <Countdown
                  date={new Date(data?.timeAllotted)}
                  renderer={CountDownRenderer}
                />
              </div>
              <div className="bg-[#CEC7F4] w-full rounded-2xl p-7 border border-purple">
                <p className="text-[1.5rem] font-semibold">Pool Bounty</p>

                <h2 className="text-[3rem] font-bold leading-tight make-flex gap-2 border border-[#BDBCBC] rounded-lg bg-white my-2">
                  50$
                </h2>
              </div>
            </div>
          ) : (
            <div className="bg-[#CEC7F4] w-full rounded-2xl p-8 border border-purple text-[2rem] font-bold">
              No Bounty Active 🥲
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Question;
