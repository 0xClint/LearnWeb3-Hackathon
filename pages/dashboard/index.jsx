import { Footer, Header, Loader } from "@/components";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SDK from "weavedb-sdk";

const Dashboard = () => {
  const [questionData, setQuestionData] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getQuestions = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    setLoader(true);
    const db = new SDK({
      contractTxId: process.env.NEXT_PUBLIC_QUESTION_CONTRACT_ID,
    });
    await db.init();

    const result = await db.get(
      "questions",
      ["address"],
      ["address", "==", account]
    );
    setQuestionData(result);
    console.log(result);
    setLoader(false);
  };

  const getAnswer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    setLoader(true);
    const _db = new SDK({
      contractTxId: process.env.NEXT_PUBLIC_ANSWER_CONTRACT_ID,
    });
    await _db.init();

    const result1 = await _db.get(
      "answers",
      ["address"],
      ["address", "==", account]
    );
    console.log(result1);
    setAnswerData(result1);
    setLoader(false);
  };

  useEffect(() => {
    getAnswer();
    getQuestions();
  }, []);
  return (
    <div>
      <div className="bg-purple-gray py-4 my-5 mx-20 rounded-3xl">
        <Header />
      </div>
      <h2 className="text-center text-[1.5rem] font-bold my-2">
        Your Dashboard
      </h2>
      {loader ? (
        <Loader />
      ) : (
        <div role="tablist" className="tabs tabs-lifted  mx-60 mt-7 rounded-xl">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Questions"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-3"
          >
            <div className="flex flex-col gap-2">
              {questionData?.map(({ question, questionId }, index) => {
                return (
                  <Link
                    href={`/questions/${questionId}`}
                    className="font-semibold text-[1.2rem]  hover:bg-[#f5f5f5] rounded-md p-4"
                    key={index}
                  >
                    {index + 1}. {question}
                  </Link>
                );
              })}
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Answers"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-3"
          >
            <div className="flex flex-col gap-2">
              {answerData?.map(({ answer, questionId }, index) => {
                return (
                  <Link
                    href={`/questions/${questionId}`}
                    className="font-semibold hover:bg-[#f5f5f5] rounded-md p-4"
                    key={index}
                  >
                    Ans {index + 1}.{" "}
                    <div
                      className="my-1 mb-2"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                    <button className="btn btn-sm text-white bg-purple hover:bg-[#7B69DF]"> collect Bounty</button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
