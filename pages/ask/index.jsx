"use client";
import { Footer, Header, Loader } from "@/components";
import NotePicker from "@/components/TextEditor/NotePicker";
import React, { useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import SDK from "weavedb-sdk";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { addQuestionFn } from "@/libs/contractFunctionCall";
import { blockchainList, random } from "@/libs/constant";
import Link from "next/link";

const tagsData = [
  { id: 1, tag: "smart-contracts" },
  { id: 2, tag: "solidity" },
  { id: 3, tag: "web3js" },
  { id: 4, tag: "truffle" },
  { id: 5, tag: "eth-wallet" },
  { id: 6, tag: "ether" },
  { id: 7, tag: "ethereum-classic" },
  { id: 8, tag: "gas" },
  { id: 9, tag: "blockchain" },
  { id: 10, tag: "erc-20" },
  { id: 11, tag: "Defi" },
  { id: 12, tag: "metamask" },
  { id: 13, tag: "ganache" },
  { id: 14, tag: "web3.py" },
  { id: 15, tag: "arbitrum" },
];

const Ask = () => {
  const router = useRouter();
  const [bountyFlag, setBountyFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [poolBounty, setpoolBounty] = useState("");
  const [winnerBounty, setWinnerBounty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [content, setContent] = useState("");

  const addQuestion = async (data) => {
    const db = new SDK({
      contractTxId: process.env.NEXT_PUBLIC_QUESTION_CONTRACT_ID,
    });
    await db.init();
    await db.set(data, "questions", data ? data.questionId : "1111");
    // const result = await db.get("questions");
    // console.log(result);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (bountyFlag) document.getElementById("my_modal_4").showModal();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    // console.log(title, tags, content);

    // Code here=
    if (!bountyFlag) {
      const data = {
        address: account,
        questionId: random().toString(),
        question: title,
        details: content,
        tags: JSON.stringify(tags),
        timeOfCreation: new Date().toISOString(),
        timeBased: false,
        timeAllotted: "0",
        like: 0,
        dislike: 0,
      };
      console.log(data);

      await addQuestion(data);
      setTimeout(() => {
        router.push(`/questions/${data.questionId}`);
        setLoader(false);
      }, 3000);
    }
    setLoader(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  const handleBountySubmit = async () => {
    console.log(
      poolBounty,
      winnerBounty,

      deadline,
      typeof deadline
    );
    setLoader(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    const data = {
      address: account,
      questionId: random().toString(),
      question: title,
      details: content,
      tags: JSON.stringify(tags),
      timeOfCreation: new Date().toISOString(),
      timeBased: true,
      timeAllotted: deadline,
      like: 0,
      dislike: 0,
    };
    console.log(data);
    await addQuestion(data);
    console.log(ethers.utils.parseEther(winnerBounty, "ether"));
    const _bountyPool = Number(ethers.utils.parseUnits(poolBounty, "ether"));
    const _mainBounty = Number(ethers.utils.parseUnits(winnerBounty, "ether"));
    await addQuestionFn(
      signer,
      {
        _questionId: Number(data.questionId),
        _bountyBased: true,
        _mainBounty,
        _bountyPool,
        _timeOfBounty: Math.floor(new Date().getTime() / 1000),
      },
      (Number(poolBounty) + Number(winnerBounty)).toString()
      // (Number(poolBounty) + Number(winnerBounty)).toString()
    );
    router.push(`/questions/${data.questionId}`);
    setLoader(false);
  };

  return (
    <div>
      {loader && <Loader />}
      <div className="bg-purple-gray py-4 my-5 mx-20 rounded-3xl">
        <Header />
      </div>
      <h2 className="text-center text-[3rem] font-bold my-2 mb-14">
        Ask Public Question
      </h2>
      <div className="mx-52 border border-black p-10 rounded-2xl">
        <form
          className="flex  flex-col gap-6"
          id="myForm"
          onSubmit={handleSubmit}
        >
          <label className="form-control w-full ">
            <div className="label flex flex-col items-start">
              <span className="label-text text-lg font-semibold">Title</span>
              <span className="label-text text-sm ">
                Be specific and imagine you're asking a question to another
                person
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input input-bordered border-[#000000] w-full text-black"
            />
          </label>
          <div className="flex justify-between">
            <label className="form-control w-full ">
              <div className="label flex flex-col items-start">
                <span className="label-text text-lg font-semibold">Tag</span>
                <span className="label-text text-sm ">
                  Select tags related to your question
                </span>
              </div>
              <select
                className="select select-bordered w-full max-w-xs border-[#000000]"
                required
                onChange={(e) => setTags([...tags, e.target.value])}
              >
                <option disabled value={"hh"}>
                  Select an Option
                </option>
                {tagsData.map(({ tag, id }) => (
                  <option key={id}>{tag}</option>
                ))}
              </select>
            </label>
            <label className="form-control w-full ">
              <div className="label flex flex-col items-start">
                <span className="label-text text-lg font-semibold">Chain</span>
                <span className="label-text text-sm ">
                  Select chain related to your question
                </span>
              </div>
              <select
                className="select select-bordered w-full max-w-xs border-[#000000]"
                required
                onChange={(e) => setTags([...tags, e.target.value])}
              >
                <option disabled value={"hh"}>
                  Select an Option
                </option>
                {blockchainList.map(({ chain, id }) => (
                  <option key={id}>{chain}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="make-flex justify-start gap-3">
            {tags.map((item, index) => (
              <div key={index} className="badge badge-outline">
                {item}
              </div>
            ))}
          </div>
        </form>
        <div>
          <div className="label flex flex-col items-start">
            <span className="label-text text-lg font-semibold">Body</span>
            <span className="label-text text-sm ">
              Include all information someone would need to answer your question
            </span>
          </div>
          <NotePicker content={content} setContent={setContent} />
        </div>
        <div className="flex justify-between">
          <div>
            <button
              className="btn btn-outline mr-2 w-40"
              type="submit"
              form="myForm"
              onSubmit={submitForm}
            >
              Submit
            </button>
            <button
              className="btn btn-neutral w-40"
              type="submit"
              form="myForm"
              onSubmit={submitForm}
              onClick={() => setBountyFlag(true)}
            >
              Submit as Bounty
            </button>
          </div>
          <Link
            href="/ask-AI"
            className="btn bg-purple text-lg  text-white  w-36  "
          >
            Ask AI
            <FaWandMagicSparkles />
          </Link>
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-3/5">
            <h3 className="font-bold text-lg mb-2">Add Bounty</h3>
            <form className="flex flex-col gap-2" onSubmit={handleBountySubmit}>
              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Pool Bounty Amount
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="add amount in Eth"
                  required
                  value={poolBounty}
                  onChange={(e) => setpoolBounty(e.target.value)}
                  className="input input-bordered border-[#000000] w-full"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Winner Bounty Amount
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="add amount in Eth"
                  required
                  value={winnerBounty}
                  onChange={(e) => setWinnerBounty(e.target.value)}
                  className="input input-bordered border-[#000000] w-full"
                />
              </label>

              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Select Time
                  </span>
                </div>
                <input
                  type="datetime-local"
                  placeholder="add amount in $"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="input input-bordered border-[#000000] w-full"
                />
              </label>
            </form>
            <div className="modal-action w-full make-flex">
              {loader ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                <button
                  className="btn btn-neutral mx-auto w-32"
                  onClick={() => handleBountySubmit()}
                  disabled={!deadline && !winnerBounty && !poolBounty}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </dialog>
      </div>
      <Footer />
    </div>
  );
};

export default Ask;
