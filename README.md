
# QueriFi

QueriFi, as the name suggests, is for resolving errors encountered while compiling your Solidity or XYZ Lang code when you can't find anyone to assist you. Simply ask on QueriFi, and once you find the solution, answer others' queries as well. Ask, Pay, and Earn.

## Core Working

*Before delving into the details below, it's best to watch the project video [here](https://youtu.be/04FjwRdMbcQ?si=r5w3Np9HbPLthP1l) for more technical insights.*

| Arbitrum | WeaveDB | Flock.io |
|---|---|---|
| QueriFi utilizes **Arbitrum** to manage the distribution of the bounty pool for questions and other rewards provided by the question creator and the platform. We attempted to utilize **Arbitrum Stylus** and experimented with Rust, but ultimately found Solidity to be more straightforward for our use case. Here are all the deployed [contracts](https://github.com/0xClint/LearnWeb3-Hackathon/tree/main/libs/contract) on Arbitrum Sepolia. | For storing all other information such as questions, answers, likes, dislikes, comments, and other core functionalities, we opted for **WeaveDB**. It's fast, easy to use with its web console, and scalable due to its NoSQL nature. Here is the address at which we [deployed](https://sonar.warp.cc/#/app/contract/_ER6hmGNsXRIOHDqKbzgBCRf4jaH7nitGvnI3M1htA0?network=mainnet&page=7) the [database](https://sonar.warp.cc/?#/app/contract/6I3VuD4ikvcmYOyDL0x1-2T_Txh6kYRbz07BFuQ2RR0?network=mainnet#). | To develop the GPT for our platform capable of handling both basic questions and code inquiries intelligently, we utilized Flock.io. We contributed to and deployed it (Node.js) so that we can engage live on our [website](https://learn-web3-hackathon.vercel.app/ask-AI). |


## Features

- QueriFi users can ask and answer detailed technical questions and format them as they prefer, whether it's code, comments, or bullet points.
![Feature Showcase](https://media.discordapp.net/attachments/1127933096008892478/1227134546428952659/image.png?ex=66274d1a&is=6614d81a&hm=f839bb9a66b31ba1e87582e990f2c37992220eeb2909507f1bfcca4b4253e475&=&format=webp&quality=lossless)
- Users can earn payment for answers if the question carries a bounty, and they may even win the main prize set by the question creator.
- To ensure fairness, the main bounty can be reclaimed (See Contract). Additionally, to prevent users from obtaining answers without payment, a bounty pool is available.
- Ask as many questions you'd like to AI while creating question or anywhere on the platform with AI button on top.
- Users can express their preference by liking or disliking answers.
- The distribution of the bounty pool prize is determined based on the like-dislike ratio, for which we have implemented an algorithm to ensure fair distribution.
- Users can ask cross-chain questions and utilize our tag feature to categorize their queries and facilitate searching.
![Feature Showcase](https://media.discordapp.net/attachments/1127933096008892478/1227146270389309511/image.png?ex=66275806&is=6614e306&hm=b484b46cf144f9d51ef092e8606dc70d34177e191943a9a5b928f0f383af17cb&=&format=webp&quality=lossless)

## Upcoming Features

Live meetings with mentors or tutors will soon be available for regular question-solving sessions, along with a social platform facilitated by **Farcaster**.

- [ ] Revert main bounty feature for question creators.
- [ ] Implement a search bar to search within questions.
- [ ] Implement a search bar to search through answers.
- [ ] Add a comment feature on answers.
- [ ] Enable cross-chain transactions to eliminate the need for wallet changes.
- [ ] Implement views and different sorting options on the homepage.

> **NOTE:** The tech stack includes Arbitrum, WeaveDB, Flock.ai, Next.js, Node.js, NoSQL, Solidity, Rust, etc.

<div style="display: flex; justify-content: center;">
  <img src="https://media.discordapp.net/attachments/1127933096008892478/1227149418957115492/image.png?ex=66275af4&is=6614e5f4&hm=8cbb48d2fc4a31b95245432f8682395b63619ef7c191509aed6049d00d0397b2&=&format=webp&quality=lossless&width=365&height=704" alt="Core Working Components" style="width: 25%;" />
</div>

--- 
