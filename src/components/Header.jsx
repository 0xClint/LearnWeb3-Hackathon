import React from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  return (
    <div className=" navbar bg-base-100 w-[80vw] mx-auto rounded-2xl p-3">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl font-bold" href="/">LOGO</Link>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal  px-1 mr-2">
          <li>
            <details>
              <summary className="font-semibold">Link 1</summary>
              <ul className="p-2 bg-base-100 rounded-t-none w-32">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li className="font-semibold">
            <a>Link 2</a>
          </li>
          <li>
            <details>
              <summary className="font-semibold">chain</summary>
              <ul className="p-2 bg-base-100 rounded-t-none w-32">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
        <ConnectWallet />
      </div>
    </div>
  );
  {
    /* </div> */
  }
  {
    /* {loader && <Loader />} */
  }
  {
    /* </div> */
  }
};

export default Header;
