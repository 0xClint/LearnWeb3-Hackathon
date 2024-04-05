import React from "react";

const Loader = () => {
  return (
    <div
      className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center"
      style={{ background: "rgba(223, 223, 223, 0.22)" }}
    >
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );
};

export default Loader;