import { Footer, Header } from "@/components";
import NotePicker from "@/components/TextEditor/NotePicker";
import React from "react";

const Ask = () => {
  return (
    <div>
      <div className="bg-purple-gray py-4 my-5 mx-20 rounded-3xl">
        <Header />
      </div>
      <NotePicker />
      <Footer />
    </div>
  );
};

export default Ask;
