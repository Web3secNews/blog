---
author: Chirag Agrawal
pubDatetime: 2023-07-05T18:12:17Z
title:  Common Smart Contract Vulnerabilities Audit Checklist 
description: List of Smart Contract Security Vulnerabilities for Auditing Smart Contracts
tags:
  - audit
  - smartcontracts
  - vulnerability
  - checklist
---

*Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on **[web3sec.news](https://web3sec.news/)***

*The ultimate open-source platform for sharing Web3 security insights. Publish your **[blog topics](https://github.com/Web3secNews/blog)**, from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.*

**[Join the vibrant Web3 security community today 🤝](https://discord.com/invite/CseAxvtrZ3)**

### Introduction

While we learn to audit smart contracts and be creative in detecting vulnerabilities, it is critical to have a comprehensive checklist of typical vulnerabilities that can be used as a reference to auditing a smart contract return in solidity. This checklist will help you audit Solidity code so that you can test for different known vulnerabilities with confidence and accuracy.

List of Common Solidity Smart Contract Vulnerabilities

- Reentrancy (ERC721, ERC1155, ERC777)
- Sandwich attacks (front-running/back-running)
- Flash loan attacks (oracle manipulation)
- Block stuffing
- DoS with revert or infinite gas consumption
- DoS due to Underflow
- Metamorphic contracts (bytecode mutation)
- Signature replay attacks
- Short address attacks (Solidity <0.5.0)
- Token approval griefing
- Unexpected non-zero ether balance (self-destruct)
- Calls to arbitrary contracts
- Every address can accept ether leads to DoS
- Force-feeding attacks
- Weak on-chain randomness (prevrandao)
- Unbounded loops (pagination)
- Unbounded gas consumption by returning a lot of data
- Default enum values
- Duplicate array elements
- Hash collisions with dynamic types (packed ABI encoding)
- Storage collisions with delegate call
- Function selector collisions (zero selectors)
- Wrong inheritance order
- Strict Equalities DoS
- Integer overflow/underflow (Solidity <0.8.0)
- Lack of precision in calculations
- Access control via tx. origin
- Problems with ERC20 decimals
- Misinitialization of contracts (ownership/proxy)
- Private key leaks in .env files
- Directional character (U+202E) usage (Solidity <0.7.6)
- Compiler bugs
- Price Oracle Manipulation
- Unlimited Token allowance
- Lack of Access Controls
- Asserting contract from Code Size
- Delegate call to Untrusted Callee
- Unsafe Typecast
- Write to Arbitrary storage collision
- Insufficient User-Input Validation
- Unchecked return value
- Message call with hard-coded gas
- Short Address attack
- Divide before multiply
- Unsafe Ownership transfer
- Improper Array Deletion
- Dirty High Order Bits
- Floating Point Arithmetic
- Unexpected Ether Leading to DoS
- Use of deprecated solidity Functions
- Check for Gas Optimizations
- Forcefully Send Ether with Selfdestruct
- Hidden malicious code
- Honeypots
- on-chain & off-chain data handling
- Ineffective key-management
- Transaction order manipulation
- Governance-related vulnerabilities
- Incorrect Integration
- Vulnerable Rebalancing/Buyback Mechanics
- Faulty Native Token handling
- Serialization/Parsing Issues
- Naive Trust Assumptions
- Uninitialized Proxies
- Reinitialization Vulnerability
- Incorrect Special Character Handling
- Botched Upgrades
- Governance Takeovers
- Flawed Math
- Transaction Replay Attack
- Logic Errors
- Exploiting Approvals
- Gas Siphoning
- UI Issues
- Check for Business Logic Vulnerabilities
- Check for correct inheritance
- Check if the spot price from an AMM as an oracle is used
- Check for tokens that use too many or too few decimals
- Check if internal accounting is mixed with actual balances
- Check if the Contract approves tokens before transferFrom to avoid revert
- Check if state variable layout is followed when using delegate-call in proxy contracts
- Check if events are emitted on critical functions

The checklist was created by conducting research on numerous open-source blogs and websites. Thank you to everyone in the web3sec community who shared their knowledge and expertise with us.
Please feel free to submit a PR to include more vulnerabilities; I aim to keep updating this with new vulnerabilities so that you don't miss any flaws during an audit.


Thank you for reading ✌🏻

Stay tuned for the upcoming " Smart Contract Audit Methodology ✅ "

> Written By
- Name: Chirag Agrawal
- Twitter: [Raiders](https://twitter.com/__Raiders)
