"use client";
import { CountDownRenderer } from "@/components";
import { ethers } from "ethers";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Countdown from "react-countdown";

import SDK from "weavedb-sdk";
import { AICall } from "../api/hello";
import axios from "axios";
import {
  addQuestionFn,
  getAnswerFn,
  getQuestionFn,
  getCurrentBountyFn,
  distributeMainBountyFn,
} from "@/libs/contractFunctionCall";
import { getDisplayName } from "next/dist/shared/lib/utils";

const contractTxId = process.env.NEXT_PUBLIC_QUESTION_CONTRACT_ID;

const Temp = () => {
  const [initDB, setInitDB] = useState(false);
  const [db, setDb] = useState(null);

  const setupWeaveDB = async () => {
    const _db = new SDK({
      contractTxId,
    });
    await _db.init();
    setDb(_db);
    setInitDB(true);
  };

  const getData = async () => {
    const db = new SDK({ contractTxId });
    await db.init();
    const result = await db.get("questions");
    console.log(result);
  };
  const addData = async () => {
    await db.set(
      {
        address: "0xdfsdf",
        questionId: 2,
        question: "abcd",
        details: "efgh",
        tags: "willTestLater",
        timeOfCreation: 1712242745,
        timeBased: false,
        timeAllotted: 12345,
      },
      "question",
      "2"
    );
  };

  const updateData = async () => {
    await db.update(
      {
        done: true,
      },
      "tasks",
      "task1"
    );
    await getData();
  };
  const deleteData = async () => {
    await db.delete("tasks", "task1");
    await getData();
  };

  const authenticate = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const wallet_address = await provider.getSigner().getAddress();
    const { identity } = await db.createTempAddress(wallet_address);
    console.log(identity);
  };

  useEffect(() => {
    setupWeaveDB();
  }, []);

  const handleAICall = async () => {
    await makePostRequestToServer("What is Etheruem");
  };

  async function makePostRequestToServer(prompt) {
    try {
      // Define the data to send in the POST request
      const data = { prompt };

      // Make the POST request to your Node.js server
      const response = await axios.post(
        "https://learnweb3-backend.onrender.com/api/chatbot",
        {
          prompt: "Is Ethereum is turing complete or not?",
        }
      );
      console.log(response.data);
      // Return the response data
      // return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  const addQfn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    await getQuestionFn(signer, 9367815);
    // await getAnswerFn(signer, 5320693);
    await getCurrentBountyFn(signer, 9367815,);
    await distributeMainBountyFn(signer, 9367815, 5340323);
  };

  return (
    <div className="flex gap-5">
      <button onClick={() => getData()}> get data</button>
      <button onClick={() => addData()}> add data</button>
      <button onClick={() => updateData()}> update data</button>
      <button onClick={() => deleteData()}> delete data</button>
      <button onClick={() => authenticate()}> authenticate</button>
      <button onClick={() => addQfn()}> Function Call</button>
      {/* <Countdown date={Date.now() + 10000} renderer={CountDownRenderer} /> */}
    </div>
  );
};

export default Temp;
