"use client";
import { Header, Footer } from "@/components";
import { isValidJSON } from "@/libs/constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import SDK from "weavedb-sdk";

export default function Home() {
  const [db, setDb] = useState(null);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoader(true);
    const db = new SDK({
      contractTxId: process.env.NEXT_PUBLIC_QUESTION_CONTRACT_ID,
    });
    await db.init();
    const result = await db.get("questions", 3, ["timeOfCreation", "desc"]);

    setData(result);
    setLoader(false);
    console.log(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[100vw]">
      <div className="hero-section my-12 mx-20 h-[100vh] bg-purple-gray rounded-3xl py-12">
        <div className="h-1/5">
          <Header />
        </div>
        <div className="h-2/3 text-white make-flex flex-col gap-10">
          <div className="badge cursor-pointer px-3 py-4 text-purple bg-purple-light font-semibold">
            ABOUT US
          </div>
          <h2 className=" font-bold text-[5rem] ">
            F&Q Website with AI Features
          </h2>
          <p className="w-3/5 mx-auto text-[1.4rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="flex mx-36 gap-5">
        <div className="w-full bg-[#F9F3FF] rounded-2xl">
          <div className="heading p-3 flex ">
            <div>
              <button className="btn btn-ghost hover:bg-[#ECDEF9] rounded-2xl">
                Top Questions
              </button>
              <button className="btn btn-ghost hover:bg-[#ECDEF9] rounded-2xl">
                Featured
              </button>
              <button className="btn btn-ghost hover:bg-[#ECDEF9] rounded-2xl">
                Most updated
              </button>
            </div>
          </div>
        </div>
        <div className="make-flex">
          <div className="btn btn-outline btn-lg w-36">
            Ask AI
            <FaWandMagicSparkles />
          </div>
        </div>
      </div>
      {loader ? (
        <span className="loading loading-spinner loading-lg text-purple mx-auto flex my-3"></span>
      ) : (
        <div className="question-container mx-36 text-left my-5 make-flex flex-col gap-5">
          {data?.map(
            (
              { address, details, question, tags, timeOfCreation, questionId },
              index
            ) => (
              <Link
                href={`/questions/${questionId}`}
                className="w-full"
                key={index}
              >
                <div className="py-5 px-8 border border-purple rounded-xl w-full">
                  <h2 className="text-[1.4rem] font-semibold">{question}</h2>
                  <div className="w-full max-h-[300px] overflow-y-auto overflow-x-auto">
                    <div
                      className="my-5"
                      dangerouslySetInnerHTML={{ __html: details }}
                    />
                  </div>
                  <div className="flex gap-3">
                    {isValidJSON(tags)
                      ? JSON.parse(tags).map((item, index) => (
                          <div
                            key={index}
                            className="badge badge-outline cursor-pointer px-2 py-3 text-sm text-purple bg-purple-light font-semibold"
                          >
                            {item}
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </Link>
            )
          )}
          {/* <Link href="/questions/1">
            <div className="py-5 px-8 border border-purple rounded-xl">
              <h2 className="text-[1.4rem]  font-semibold">
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam?
              </h2>
              <p className="my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex gap-3">
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
          </Link>
          <div className="py-5 px-8 border border-purple rounded-xl">
            <h2 className="text-[1.4rem]  font-semibold">
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam?
            </h2>
            <p className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex gap-3">
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
          <div className="py-5 px-8 border border-purple rounded-xl">
            <h2 className="text-[1.4rem]  font-semibold">
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam?
            </h2>
            <p className="my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex gap-3">
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
          </div> */}
          <div className="w-full make-flex justify-end items-end">
            <a
              className="text-right font-semibold link text-purple-gray"
              href="#"
            >
              more
            </a>
          </div>
        </div>
      )}

      <div className="make-flex mx-[12rem] gap-20 my-[5rem]">
        <div className="w-[600px] h-[500px] bg-purple rounded-3xl"></div>
        <div className="w-[600px] h-[500px] bg-purple-light rounded-3xl"></div>
      </div>

      <div className=" bg-purple-gray text-white mx-20 rounded-2xl make-flex gap-12 py-10 px-20 my-20">
        <p className="text-[1.2rem]">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <div className="w-52 ">
          <button className="btn w-36">Subscribe</button>
        </div>
      </div>

      <div className="make-flex mx-[7rem] justify-around">
        <div className="w-[390px] h-[370px] bg-[#ECEAFF] rounded-3xl p-10">
          <h3 className="text-[3rem] font-bold leading-tight mb-8">
            Question Answered
          </h3>
          <p className="text-[1.1rem]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
        </div>
        <div className="w-[390px] h-[370px] bg-[#FFECE5] rounded-3xl p-10">
          <h3 className="text-[3rem] font-bold leading-tight mb-8">
            Question Answered
          </h3>
          <p className="text-[1.1rem]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
        </div>
        <div className="w-[390px] h-[370px] bg-[#FEEAF3] rounded-3xl p-10">
          <h3 className="text-[3rem] font-bold leading-tight mb-8">
            Question Answered
          </h3>
          <p className="text-[1.1rem]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
