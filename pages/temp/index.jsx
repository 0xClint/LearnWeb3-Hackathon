"use client";
import { CountDownRenderer } from "@/components";
import { ethers } from "ethers";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Countdown from "react-countdown";

import SDK from "weavedb-sdk";
import { AICall } from "../api/hello";
import axios from "axios";

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
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FLOCK_BOT_ENDPOINT}/chat/conversational_rag_chat`,
        {
          question: "What is Ethereum?",
          knowledge_source_id: "0x7521b754a946844c720a4772f16b0574680223a8",
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_FLOCK_BOT_API_KEY,
            "Content-Type": "application/json", // Ensure API key is set in .env
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postData = async (data) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_FLOCK_BOT_ENDPOINT}/chat/conversational_rag_chat`,
        {
          question: "What is Ethereum?",
          knowledge_source_id: "0x7521b754a946844c720a4772f16b0574680223a8",
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_FLOCK_BOT_API_KEY,
            "Content-Type": "application/json", // Ensure API key is set in .env
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <div className="flex gap-5">
      <button onClick={() => getData()}> get data</button>
      <button onClick={() => addData()}> add data</button>
      <button onClick={() => updateData()}> update data</button>
      <button onClick={() => deleteData()}> delete data</button>
      <button onClick={() => authenticate()}> authenticate</button>
      <button onClick={() => handleAICall()}> AI Call</button>
      {/* <Countdown date={Date.now() + 10000} renderer={CountDownRenderer} /> */}
    </div>
  );
};

export default Temp;
