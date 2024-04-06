import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract/constant";

export const addQuestionFn = async (signer, data, amount) => {
  const { _questionId, _bountyBased, _mainBounty, _bountyPool, _timeOfBounty } =
    data;
  console.log(_mainBounty + _bountyPool);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.createQuestion(
      _questionId,
      _bountyBased,
      _mainBounty,
      _bountyPool,
      _timeOfBounty,
      { value: _mainBounty + _bountyPool }
    );
    await tx.wait();
    console.log(tx);
    // Handle the transaction response or receipt as needed
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const addAnswerFn = async (signer, answerId, questionId) => {
  console.log(answerId, questionId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.createAnswer(answerId, questionId);
    await tx.wait();
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const likeAnswerFn = async (signer, answerId) => {
  console.log(answerId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.likeAnswer(answerId);
    await tx.wait();
  } catch (error) {
    return error;
  }
};

export const dislikeAnswerFn = async (signer, answerId) => {
  // console.log(answerId);
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const tx = await contract.dislikeAnswer(answerId);
    await tx.wait();
  } catch (error) {
    return error;
  }
};

export const getQuestionFn = async (signer) => {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    // Call a function of your contract
    const res = await contract.getQuestion(2930977);
    // console.log(res);
    return {
      _mainBounty: Number(res.mainBounty),
      _bountyPool: Number(res.bountyPool),
    };
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
