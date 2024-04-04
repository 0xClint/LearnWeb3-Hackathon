"use client";
import React, { useEffect, useState } from "react";
import SDK from "weavedb-sdk";

const contractTxId = "O-Dmtl-x5kceLHwI0GgFqckpqCKuLysUdtE__5dBspI";

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
    const result = await db.get("question");
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

  useEffect(() => {
    setupWeaveDB();
  }, []);
  return (
    <div className="flex gap-5">
      <button onClick={() => getData()}> get data</button>
      <button onClick={() => addData()}> add data</button>
      <button onClick={() => updateData()}> update data</button>
      <button onClick={() => deleteData()}> delete data</button>
    </div>
  );
};

export default Temp;
