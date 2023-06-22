---
author: Chirag Agrawal
pubDatetime: 2023-06-22T13:45:21Z
title: Top 20 Smart Contract Security Best Practices Checklist 
description: Smart Contract Security Best Practices
tags:
  - web3sec
  - smartcontracts
  - vulnerability
  - bestpractice
---

*Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on **[web3sec.news](https://web3sec.news/)***

*The ultimate open-source platform for sharing Web3 security insights. Publish your **[blog topics](https://github.com/Web3secNews/blog)**, from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.*

**[Join the vibrant Web3 security community today 🤝](https://discord.com/invite/CseAxvtrZ3)**

## Introduction

Contrary to conventional contracts, smart contracts not only describe rules but also use programming to enforce those rules. They run on continually developing, prone to faults and vulnerabilities blockchain systems like Ethereum. 

- It is essential to stick to recommended practices that change with the constantly shifting environment if you want to make sure that smart contracts are secure.
- The recommended practices for securing smart contracts will be covered in detail in this blog.

## ****General Best Practices Checklist for Smart Contracts****

- [ ]  **Be Ready for failure** : effectively manage funds at risk when things go wrong. formulate an effective upgrade strategy for bug fixes & loopholes.
- [ ]  **Ensure cautious deployments** : thoroughly test contract before roll outs,adding proper test cases and participating in bug bounties.
- [ ]  **Simple business logic & smart contract code** : complex code results on more bugs and errors. modularization of code & prioritizing code clarity over performance.
- [ ]  **Stay updated & monitor changes** : adopt new security techniques, upgrade to latest versions as soon possible & scan contract for new bugs/errors.
- [ ]  **Be mindful of blockchain features** : be attentive of certain pitfalls & blockchain properties like external calls can lead to malicious code execution, private data in smart contracts can be viewed, any public functions can be called by attackers, timestamps can be altered by miners,gas costs, random number generator attacks etc..
- [ ]  **Evaluate core trade-offs** : find balance between modularization, **upgrade-able components & code reuse.** You must strike a balance between these trade-offs when evaluating the security and architecture of your smart contract system.
    - If previously self-owned contracts you have deployed are not available, you should rely on duplication.
    - If your smart contract only executes a small number of operations for a set amount of time, choose simplicity over complexity.
- [ ]  **Monitor contractual operations** : use proactive measures to detect malicious transactions & record events in well-protected logs. This should be heavily automated such that serious emergency intervention can be taken care off before the disaster.
- [ ]  **Knowing contract's purpose** : test & accomplish the desired result expected from the smart contract.
- [ ]  **Choose a meaningful name** : Try to explain what the contract performs in the name by keeping it simple and basic.
- [ ]  **Peer review** : get your smart contract code reviewed by peers so that engineers may share their understanding of the code, cutting down on future maintenance time and costs.
- [ ]  **Testing on a Test-net :** setup your smart contract code for thorough testing before deploying it on main-net.
- [ ]  **Test cases Documentation** : Keep track of the test cases you execute so you have them on hand for reference and verification in future.
- [ ]  **Validate Inputs :** Validate user inputs strictly to prevent unauthorized data entry. Don't give hackers a chance to take advantage of weaknesses.
- [ ]  **Use External Oracles Carefully:** Although they can improve functionality, oracles should only be used with credible sources to avoid using data that could jeopardize your contracts.
- [ ]  **Upgrade with Caution:** Carefully examine modifications for security implications before applying upgrades. Avoid making an upgrade a hacker entry point!
- [ ]  **Manage your wallet securely** by guarding your private keys like priceless items. For increased security, use hardware wallets or cold storage options.
- [ ]  **Examine formal validation :** get your contracts mathematically proven and verify the correctness and security properties of smart contracts to ensure things are align as intended.
- [ ]  **Gas Limit Considerations:** Be aware of gas restrictions to prevent circumstances where there isn't enough gas, which could cause a contract to fail or make you a target for attackers.
- [ ]  **Beware of coding an invariant** that strictly checks the balance of a contract.
- [ ]  **Make sure that there is a backup plan** in place in case one party cannot complete the required step in order to execute a refund or claim.
- [ ]  **Use Multi-sig:** For crucial operations, use multi signature wallets to lower the chance of single point failures. Shared security entails shared responsibility!

Thank you for reading ✌🏻

Please feel free to share your feedback & stay tuned for the upcoming “Solidity Security Checklist ✅ ”
> Written By
- Name: Chirag Agrawal
- Twitter: [Raiders](https://twitter.com/__Raiders)
