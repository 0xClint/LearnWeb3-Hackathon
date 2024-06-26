"use client";
import { Header, Footer, CountDownRenderer, Loader } from "@/components";
import { getRandomLetter, isValidJSON, random } from "@/libs/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { FaRegEdit } from "react-icons/fa";
import SDK from "weavedb-sdk";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import TimeAgo from "react-timeago";
import NotePicker from "@/components/TextEditor/NotePicker";
import Link from "next/link";
import { ethers } from "ethers";
import {
  addAnswerFn,
  dislikeAnswerFn,
  distributeMainBountyFn,
  getQuestionFn,
  likeAnswerFn,
} from "@/libs/contractFunctionCall";

const Question = () => {
  const router = useRouter();
  const [likeError, setLikeError] = useState(true);
  const [isQuestioner, setQuestioner] = useState(false);
  const [data, setData] = useState("");
  const [mainBounty, setMainBounty] = useState(0);
  const [poolBounty, setPoolBounty] = useState(0);
  const [answerData, setAnswerData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState("");
  const [bountyWinner, setBountyWinner] = useState("");
  const [db, setDb] = useState(null);
  const { questions } = router.query;

  const getData = async () => {
    setLoader(true);
    const db = new SDK({
      contractTxId: process.env.NEXT_PUBLIC_QUESTION_CONTRACT_ID,
    });
    await db.init();
    if (questions) {
      const result = await db.get("questions", questions);
      setData(result);
      console.log(result);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      console.log(result?.address, account);

      if (result?.address == account) {
        console.log("Closed");
        setQuestioner(true);
      }
      if (result?.timeBased) {
        const { _mainBounty, _bountyPool, bountyWinner } = await getQuestionFn(
          signer,
          questions
        );
        console.log("bountyWinner = ", bountyWinner);
        setMainBounty(_mainBounty);
        setPoolBounty(_bountyPool);
        setBountyWinner(bountyWinner);
      }
    }

    const _db = new SDK({
      contractTxId: process.env.NEXT_PUBLIC_ANSWER_CONTRACT_ID,
    });
    await _db.init();
    setDb(_db);
    const result1 = await _db.get(
      "answers",
      ["questionId"],
      ["questionId", "==", questions]
    );
    console.log(result1);
    setAnswerData(result1);

    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, [questions]);

  const addAnswer = async () => {
    if (db && content) {
      setLoader(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      const data = {
        address: account,
        questionId: questions,
        answerId: "ans_" + random().toString(),
        answer: content,
        timeOfCreation: new Date().toISOString(),
        comments: "",
        like: 0,
        dislike: 0,
      };
      console.log(data);
      await db.set(data, "answers", data ? data.answerId : "1111");
      // const result = await db.get("answers");
      await addAnswerFn(
        signer,
        Number(data.answerId.slice(4)),
        Number(questions)
      );
      setTimeout(() => {
        setLoader(false);
        window?.location.reload();
      }, 3000);
    }
  };
  const updateAnswer = async ({ answerId, vote, count }) => {
    if (db) {
      setLoader(true);
      console.log(answerId, vote, count);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      if (vote) {
        const res = await likeAnswerFn(signer, Number(answerId.slice(4)));
        if (res) {
          document.getElementById("my_modal_1").showModal();
          setLoader(false);
          return;
        }
        console.log("answerId= ", answerId);
        await db.update({ like: count }, "answers", answerId);
      } else {
        const res = await dislikeAnswerFn(signer, Number(answerId.slice(4)));
        if (res) {
          document.getElementById("my_modal_1").showModal();
          setLoader(false);
          return;
        }
        await db.update({ dislike: count }, "answers", answerId);
      }
      const result1 = await db.get(
        "answers",
        ["questionId"],
        ["questionId", "==", questions]
      );
      console.log(result1);
      setTimeout(() => {
        setLoader(false);
        window?.location.reload();
      }, 3000);
    }
  };

  const giveMainBounty = async (asnwerId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const res = await distributeMainBountyFn(signer, questions, asnwerId);
    if (res) {
      setLikeError(false);
      document.getElementById("my_modal_1").showModal();
    }
  };

  return (
    <div>
      {loader && <Loader />}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {likeError ? "Already liked or disliked" : "Bounty already alloted"}
          </h3>
          <p className="py-4">
            {likeError
              ? "You can give only one response!"
              : "Bounty has already been Given"}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => setLikeError(true)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="bg-purple-gray py-4 my-5 mx-20 rounded-3xl">
        <Header />
      </div>
      <div className="flex mx-32">
        <div className="w-full flex flex-col gap-6">
          {data ? (
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
                <div className="text-[#858295] text-sm make-flex gap-1">
                  Asked{" "}
                  <TimeAgo date={data ? data.timeOfCreation : "1 Feb, 2020"} />
                </div>
              </div>
              <div className="w-[900px] max-h-[300px] overflow-y-auto overflow-x-auto">
                <div
                  className="my-5"
                  dangerouslySetInnerHTML={{ __html: data?.details }}
                />
              </div>

              <div className="asked-section make-flex justify-between">
                <div className="make-flex gap-2">
                  {!isQuestioner && (
                    <Link
                      href="#answer"
                      className="btn text-white bg-purple hover:bg-[#6E5BDC]"
                    >
                      <FaRegEdit />
                      Answer
                    </Link>
                  )}

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
                </div>
                <div className=" make-flex gap-1 w-32 justify-start">
                  <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 make-flex">
                    <span className="text-xl">
                      {/* {getRandomLetter()?.toLocaleUpperCase()} */}D
                    </span>
                  </div>
                  <div className="h-10 make-flex flex-col items-start">
                    <p className="m-0 leading-5 text-sm font-semibold">
                      {data
                        ? `${data.address.slice(0, 4)}..${data.address.slice(
                            data.address.length - 4
                          )}`
                        : 0}
                    </p>
                    <p className="m-0 leading-5 text-xs">2yr</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span className="loading loading-spinner loading-md"></span>
          )}

          <div className="divider divider-start my-0">Answers</div>
          <div className="flex flex-col gap-5">
            {answerData?.map(
              ({
                address,
                questionId,
                answerId,
                answer,
                timeOfCreation,
                comments,
                like,
                dislike,
              }) => {
                return (
                  <div
                    className="py-5 px-8 border border-purple rounded-xl text-left"
                    key={answerId}
                  >
                    <div className="asked-section make-flex justify-between">
                      <div className=" make-flex gap-1 w-32 justify-start">
                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 make-flex">
                          <span className="text-xl">
                            {/* {getRandomLetter()?.toLocaleUpperCase()} */}D
                          </span>
                        </div>
                        <div className="h-10 make-flex flex-col items-start">
                          <p className="m-0 leading-5 text-sm font-semibold">
                            {address.slice(0, 4)}...
                            {address.slice(address.length - 4)}
                          </p>
                          <p className="m-0 leading-5 text-xs">2yr</p>
                        </div>
                      </div>
                      <div className="text-[#858295] text-sm">
                        Answered{" "}
                        <TimeAgo
                          date={timeOfCreation ? timeOfCreation : "1 Feb, 2020"}
                        />
                      </div>
                    </div>
                    <div className="w-[900px] max-h-[300px] overflow-y-auto overflow-x-auto">
                      <div
                        className="my-5"
                        dangerouslySetInnerHTML={{ __html: answer }}
                      />
                    </div>
                    <div className="make-flex justify-between gap-3">
                      {isQuestioner ? (
                        <button
                          onClick={() => giveMainBounty(answerId.slice(4))}
                          className="btn text-white bg-purple hover:bg-[#6E5BDC]"
                        >
                          Give Bounty
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <div className="flex gap-2">
                        <div className="flex font-semibold gap-1">
                          <FiThumbsUp
                            className="text-2xl cursor-pointer hover:scale-110"
                            onClick={() =>
                              updateAnswer({
                                answerId,
                                vote: 1,
                                count: like + 1,
                              })
                            }
                          />
                          {like ? like : 0}
                        </div>
                        <div className="flex  font-semibold gap-1">
                          <FiThumbsDown
                            className="text-2xl cursor-pointer hover:scale-110"
                            onClick={() =>
                              updateAnswer({
                                answerId,
                                vote: 0,
                                count: dislike + 1,
                              })
                            }
                          />
                          {dislike ? dislike : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            <div className="divider mb-0 font-semibold text-2xl">
              Your Answer
            </div>
            <div
              className=" text-[1.3rem] cursor-pointer make-flex flex-col items-start"
              id="answer"
            >
              <h2 className=" "></h2>
              <NotePicker content={content} setContent={setContent} />
              <button
                onClick={() => addAnswer()}
                className="btn text-white bg-purple hover:bg-[#6E5BDC]"
              >
                Post your Answer
              </button>
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
              <div className="bg-[#CEC7F4] w-full rounded-2xl flex flex-col gap-3 px-7 py-5 border border-purple">
                <div>
                  <p className="text-[1.5rem] font-semibold leading-7">
                    Winner Bounty
                  </p>
                  <h2 className="text-[2rem] h-20 font-semibold  leading-tight make-flex gap-2 border border-[#BDBCBC] rounded-lg bg-white my-1">
                    {mainBounty ? ethers.utils.formatEther(mainBounty) : "0"}eth
                  </h2>
                </div>
                <div>
                  <p className="text-[1.5rem] font-semibold leading-7">
                    Pool Bounty
                  </p>
                  <h2 className="text-[2rem] h-20 font-semibold leading-tight make-flex gap-2 border border-[#BDBCBC] rounded-lg bg-white my-1">
                    {poolBounty ? ethers.utils.formatEther(poolBounty) : "0"}eth
                  </h2>
                </div>
              </div>
              <div className="bg-[#CEC7F4] w-full rounded-2xl flex flex-col gap-3 px-7 py-5 border border-purple">
                <h3 className="font-semibold">Main Bounty Winner</h3>
                <p className="text-[1.5rem] font-semibold leading-7">
                  {bountyWinner.slice(0, 6)}....
                  {bountyWinner.slice(bountyWinner.length - 5)}
                </p>
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
