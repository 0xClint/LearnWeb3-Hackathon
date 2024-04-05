"use client";
import { Footer, Header } from "@/components";
import NotePicker from "@/components/TextEditor/NotePicker";
import React, { useState } from "react";

const tagsData = [
  { id: 1, tag: "a" },
  { id: 2, tag: "b" },
  { id: 3, tag: "c" },
  { id: 4, tag: "d" },
  { id: 5, tag: "e" },
];

const Ask = () => {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [bounty, setBounty] = useState("");
  const [bountyType, setBountyType] = useState(1);
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("my_modal_4").showModal();
    console.log(title, tags);
    // Code here=
  };

  const submitForm = (event) => {
    event.preventDefault(); // Prevent default button click behavior
    handleSubmit(event); // Call the form submission handler
  };

  const handleBountySubmit = (e) => {
    e.preventDefault();
    console.log(bounty, bountyType);
    // Code here
  };

  const submitBountyForm = (event) => {
    event.preventDefault(); // Prevent default button click behavior
    handleBountySubmit(event); // Call the form submission handler
  };

  return (
    <div>
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
          <NotePicker />
        </div>
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
        >
          Submit as Bounty
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-3/5">
            <h3 className="font-bold text-lg mb-2">Add Bounty</h3>
            <form className="flex flex-col gap-2" onSubmit={handleBountySubmit}>
              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Bounty Amount
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="add amount in $"
                  required
                  value={bounty}
                  onChange={(e) => setBounty(e.target.value)}
                  className="input input-bordered border-[#000000] w-full"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label flex flex-col items-start">
                  <span className="label-text text-md font-semibold">
                    Select Bounty Type
                  </span>
                </div>
                <select
                  className="select select-bordered w-full border-[#000000]"
                  required
                  value={bountyType}
                  onChange={(e) => setBountyType(e.target.value)}
                >
                  <option disabled value={"hh"}>
                    Select an Option
                  </option>
                  <option value={1}>Winner Bounty</option>
                  <option value={2}>Pool Bounty</option>
                </select>
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
                  required
                  className="input input-bordered border-[#000000] w-full"
                />
              </label>
            </form>
            <div className="modal-action w-full make-flex">
              <form method="dialog">
                <button
                  className="btn btn-neutral mx-auto w-32"
                  onSubmit={submitBountyForm}
                  disabled={!bounty && !deadline}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <Footer />
    </div>
  );
};

export default Ask;
