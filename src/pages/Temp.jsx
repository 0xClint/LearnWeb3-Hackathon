import React from "react";
import SDK from "weavedb-sdk";

const contractTxId = "_ER6hmGNsXRIOHDqKbzgBCRf4jaH7nitGvnI3M1htA0";
const Temp = () => {
  const getData = async () => {
    const db = new SDK({ contractTxId });
    await db.init();
    const result = await db.get(collection_name);
    console.log(result);
  };
  return <div>TEmp</div>;
};

export default Temp;
