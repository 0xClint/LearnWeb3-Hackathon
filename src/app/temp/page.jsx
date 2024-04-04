"use client";
import React, { useEffect, useState } from "react";
import SDK from "weavedb-sdk";

const contractTxId = "O-Dmtl-x5kceLHwI0GgFqckpqCKuLysUdtE__5dBspI";

const temp = () => {
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
      { task: "t1", user_address: "addr1", date: 1234, done: false },
      "tasks",
      "task1"
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

export default temp;
