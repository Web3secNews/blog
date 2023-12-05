---
author: Ravikiran Betha
pubDatetime: 2023-12-05T09:04:37Z
title: Diamond Proxy Pattern
tags:
  - EIP2535
  - Proxy
  - Upgradeability
description: Creating an upgradeable smart contract
---
*Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on **[web3sec.news](https://web3sec.news/)***

*The ultimate open-source platform for sharing Web3 security insights. Publish your **[blog topics](https://github.com/Web3secNews/blog)**, from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.*

**[Join the vibrant Web3 security community today 🤝](https://discord.com/invite/CseAxvtrZ3)**

# UPGRADE SMART CONTRACT - A DEMAND FROM BUSINESS
The software has to change, as it has to support business operations which change based on consumer requirements. To support changes in blockchain smart contracts, proxy patterns have evolved and the developer community embraced it, while duly noting that data should remain immutable while business logic could change.

## Proxy Patterns
Transparent Proxy and UUPS Proxy patterns are widely accepted patterns adopted by many web3 projects. The underlying principle is on two key elements.

### fallback
All proxy patterns rely on the fallback function to route the call to the correct function. For this purpose, the fallback function uses a delegate call to route the call to another contract providing the functionality.

### delegate call
The delegate call is key to proxy patterns as it allows the implementation to operate on the data storage of the proxy. This is how the storage layout is retained after repeated upgrades.

Transparent and UUPS patterns work great for upgradeability but have limitations as described below. Some are due to the limitations of EVM itself.

### 1. The contract cannot exceed 24KB

### 2. Works with single implementation contract

### 3. Partial upgrade of functionality is not possible, it is either an all-or-nothing kind of approach.

## Diamond Pattern

Diamond patterns take the same principles as proxy patterns leveraging the fallback and delegate functions. But, it adds a layer in the middle that supercharges the abilities of this pattern. It stores a function identifier in a mapping, using which the diamond pattern can delegate calls to functions across different implementation contracts. The diamond pattern is a single proxy that deals with many implementation contracts.

Not only does it support multiple implementation contracts, but it also provisions for incremental upgrades of functionality using the diamond-cut function.

## The key components of a diamond proxy are as follows:

### Diamond
The central contract that acts as a proxy and routes function calls to the appropriate facets. It contains a mapping of function selectors to facet addresses.

### Facets
Individual contracts that implement specific functionality. Each facet contains a set of functions that can be called by the diamond.

### Diamond Loupe
A set of standard functions is defined in EIP-2535 that provide information about the facets and function selectors used in the diamond. The diamond loupe allows developers and users to inspect and understand the structure of the diamond.

### DiamondCut
A function used to add, replace, or remove facets and their corresponding function selectors in the diamond. Only an authorized address (e.g., the diamond's owner or a multi-signature contract) can perform a diamond cut.

Please take a look at the EIP to get a detailed understanding of the diamond pattern.

[EIP-2535](https://eips.ethereum.org/EIPS/eip-2535)

# Facet reuse

## Benefits of using Diamond Pattern:

### 1. A single contract that can expand on functionality incrementally.

### 2. Ability to start small and grow incrementally by adding new features using the diamond-cut function.

### 3. Emit events for each update of functionality to track changes, logs are reference.

### 4. Solves the 24KB maximum contract size limitation, as the data and logic are now spread across many contracts.

### 5. Reusability of code

### 6. Fine grain control on data access

# Motivation

Like a diamond, where each facet is shaped slowly and carefully, you can use the diamond proxy pattern to shape your application, incrementally.

This is relatively new, but it is being actively adopted by many projects for the wide range of benefits it offers. This is an area that all solidity developers to watch.

To learn more about this pattern and different flavors, refer to the below links.

[Diamond1](https://github.com/mudgen/diamond-1-hardhat)

[Diamond2](https://github.com/mudgen/diamond-2-hardhat)

[Diamond3](https://github.com/mudgen/diamond-3-hardhat)

# Diamond Proxy Contract Security Best Practices

1. Break up the contract logic into separate facets to enable modular design and upgrades

2. The proxy contract must be initialized with a valid DiamondCut facet contract address during deployment

3. To add new state variables to a storage struct, add them to the end of the struct

4. When using the AppStorage pattern, do not declare and use state variables outside the struct

5. Do not put structs directly in another struct

6. Do not add new state variables to structs that are used in arrays

7. Do not use the same storage slot for different structs

8. Do not leave the initialize() function unprotected

9. Do NOT allow any facet to be able to call self-destruct()


> Written by

### Ravikiran Betha
- GitHub: [@betharavikiran](https://github.com/betharavikiran)
- Twitter: [@ravikiranweb3](https://twitter.com/ravikiranweb3)
