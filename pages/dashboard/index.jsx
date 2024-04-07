import { Footer, Header, Loader } from "@/components";
import { collectBountyFn } from "@/libs/contractFunctionCall";
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

  const collectBountyPool = async (questionId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const res = await collectBountyFn(signer, questionId);
    if (res) {
      document.getElementById("my_modal_1").showModal();
    }
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Bounty already claimed!</h3>
          <p className="py-4">Bounty has already been distributed.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
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
                  <div
                    className="font-semibold hover:bg-[#f5f5f5] rounded-md p-4"
                    key={index}
                  >
                    Ans {index + 1}.{" "}
                    <Link
                      href={`/questions/${questionId}`}
                      className="my-1 mb-2"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                    <button
                      onClick={() => collectBountyPool(questionId)}
                      className="btn btn-sm text-white bg-purple hover:bg-[#7B69DF]"
                    >
                      collect Bounty
                    </button>
                  </div>
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
