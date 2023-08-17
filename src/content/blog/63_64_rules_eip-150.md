---
author: cholakov Audits
pubDatetime: 2023-08-17T18:18:29Z
title: EIP-150 and 63_64 Rule 
description: EIP-150 and the 63_64 Rule
tags:
  - web3sec
  - smartcontracts
  - gas
---

**Introduction**

EIP-150, or Ethereum Improvement Proposal 150, is a protocol upgrade that was introduced as part of the Ethereum Byzantium hard fork on July 20, 2016. It made several changes to the Ethereum gas mechanics, including the introduction of the 63/64 rule. This rule limits the amount of gas that a callee (a contract that is called by another contract) can receive. This helps to prevent stack depth attacks, which can be used to disrupt the Ethereum network.

**Concept of Gas in Ethereum**

Gas is a unit of measurement for the computational resources required to execute operations or contracts on the Ethereum Virtual Machine (EVM). Each operation or contract executed on the EVM consumes a certain amount of gas, which must be paid for using Ether.

Simple operations like basic Ethereum transfers require a fixed amount of gas (e.g., 21,000 gas), while more complex operations can consume significantly higher amounts, even reaching millions of gas units. Users initiating transactions are responsible for covering the cumulative gas costs associated with the operations executed within their transactions.

**Contract Calls and Vulnerabilities**

In Ethereum, contracts can interact with other contracts through special opcodes like CALL, STATICCALL, and DELEGATECALL. These interactions are referred to as contract calls, where the invoking contract (caller) communicates with the called contract (callee). The amount of gas allocated for these interactions is specified in the opcode parameters.

Prior to EIP-150, there was a vulnerability whereby a caller could forward all its available gas to the callee. This allowed for a chain of contracts calling other contracts, potentially leading to excessive depth and causing what's known as a "stack too deep" issue. Ethereum nodes implemented a limit of 1024 as the maximum depth to prevent such issues.

**Specification of EIP-150**

EIP-150 aimed to mitigate the risk of these types of vulnerabilities, specifically the "Call Depth Attack." This attack involved malicious actors causing recursive calls to stack up to the maximum depth before calling a specific contract, leading to unintended behaviors.

EIP-150 introduced the 63/64 rule to address this challenge. According to this rule, a callee can receive at most 63/64 of the gas of the parent (caller) contract. This rule enforces a restriction on the amount of gas a callee can consume, preventing excessive recursive calls and ensuring a balanced gas distribution.

The formula for calculating the reserved portion of the available gas for the parent is:

```solidity
Reserved portion of the available gas = available gas at Stack depth N - ((63/64) * available gas at Stack depth N)
```

This formula ensures that even when forwarding all available gas to a callee, a fraction of the gas remains reserved for the calling contract.

T**he 63/64 Rule**

The 63/64 rule effectively limits the amount of gas a callee can consume, preventing the occurrence of a stack depth attack and enhancing the security and stability of the Ethereum network. This rule introduces a natural limit to the depth of recursive calls, making it practically unattainable to reach the maximum depth of 1024.

Additionally, EIP-150 modified the behavior of the CALL* opcodes, allowing calls with a reduced amount of gas when the callee's available gas is lower than the specified value. This modification further enhances the flexibility and reliability of contract calls.

The formula below calculates the gas available at any stack depth. Also, the gas available is inversely proportional to stack depth (the deeper the stack depth, the lower the gas available).

```solidity
Gas available at Stack depth 0  = Initial gas available * (63/64)^0
Gas available at Stack depth 1  = Initial gas available * (63/64)^1
Gas available at Stack depth 2  = Initial gas available * (63/64)^2
Gas available at Stack depth 3  = Initial gas available * (63/64)^3
.
.
.
Gas available at Stack depth N  = Initial gas available * (63/64)^N
```

Here are some example values.

```solidity
Assume; Initial gas available = 5000

Gas available at Stack depth 10  = 5000 * (63/64)^10 = 4924.65

Gas available at Stack depth 20  = 5000 * (63/64)^20 = 3649.06
```

**Conclusion**

EIP-150, with its introduction of the 63/64 rule, significantly enhanced the gas mechanics within the Ethereum ecosystem. By restricting the amount of gas a callee can consume, it effectively prevented stack depth attacks and improved the overall security of the network. With these improvements, Ethereum continues to evolve as a robust and secure blockchain platform, laying the foundation for further advancements in smart contract development and decentralized applications.

> Submitted By
- Name: cholakov Audits
- Twitter: [CholakovAudits](https://twitter.com/CholakovAudits)
