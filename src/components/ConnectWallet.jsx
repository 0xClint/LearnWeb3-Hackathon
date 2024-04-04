"use client";
import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  //state to store the wallet address that is connected
  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (!connected) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setAccount(_walletAddress);
    } else {
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setAccount("");
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {account ? (
        <div className="btn flex items-center text-white bg-purple bg-blue-500 gap-2">
          <FaUserLarge />

          {`${account.slice(0, 4)}..${account.slice(account.length - 4)}`}
        </div>
      ) : (
        <button
          className="btn hover:scale-[102%] bg-purple text-white"
          onClick={connectWallet}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
