import SDK from "weavedb-sdk";

const contractTxId = "_ER6hmGNsXRIOHDqKbzgBCRf4jaH7nitGvnI3M1htA0";

export const getData = async () => {
  const db = new SDK({ contractTxId });
  await db.init();
  const result = await db.get("people");
  console.log(result);
};

export const addData = async (task) => {
  await db.set({ age: 21, name: "Bobby" }, collection_name, doc_id);
  await getTasks();
};
