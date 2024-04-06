import React from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import { MdSpaceDashboard } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Image from "next/image";

const Header = () => {
  return (
    <div className=" navbar bg-base-100 w-[80vw] mx-auto rounded-2xl p-3">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl font-bold hover:scale-105" href="/">
          <Image
            src={"/logo.png"}
           width={100}
           height={50}
         
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal  px-1 mr-2">
          {/* <li>
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
          </li> */}
          <li className="font-semibold">
            <Link href="/dashboard">
              <MdSpaceDashboard className="text-lg" />
            </Link>
          </li>
          <li className="font-semibold">
            <Link href="/ask">Ask</Link>
          </li>
          <li>
            <details>
              <summary className="font-semibold">chain</summary>
              <ul className="p-2 bg-base-100 rounded-t-none w-32">
                <li>
                  <a>Arbitrum</a>
                </li>
                <li>
                  <a>Etheruem</a>
                </li>
                <li>
                  <a>Polygon</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
        <Link href="/ask-AI" className="btn btn-outline w-28 mr-2">
          Ask AI
          <FaWandMagicSparkles />
        </Link>
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
