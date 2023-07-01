---
author: Hemendra Sharma
pubDatetime: 2023-07-01T11:29:17+0000
title: Gas Optimization Deep Dive v2

tags:
  - web3sec
  - gas optimization
description: Boosting Optimization and Reducing Gas Costs
---

<em>Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on [web3sec.news](https://web3sec.news/)

The ultimate open-source platform for sharing Web3 security insights. Publish your [blog topics](https://github.com/Web3secNews/blog),
from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.</em>

[Join the vibrant Web3 security community today 🤝 ](https://discord.com/invite/CseAxvtrZ3)

## Table of contents

## GAS OPTIMIZATION TECHNIQUES

### 1. array[index] += amount` is cheaper than `array[index] = array[index] + amount
- When you use array[index] += amount, the compiler knows that you are specifically modifying the value at array[index] by adding amount to it. This allows the compiler to generate optimized bytecode that directly performs the addition operation in place, without needing to read the original value from memory.
- On the other hand, when you use array[index] = array[index] + amount, the compiler interprets it as two separate operations: reading the original value at array[index] and then performing the addition. This results in additional bytecode instructions to read the original value from memory before performing the addition operation.

  ```python
  a. For array[index] += amount
  
  SLOAD          // Load original value from storage to the stack
  PUSH1 amount   // Push the 'amount' value to the stack
  ADD            // Add 'amount' to the original value
  SSTORE         // Store the result back to storage
  
  b.For array[index] = array[index] + amount
  
  SLOAD          // Load original value from storage to the stack
  DUP1           // Duplicate the original value
  PUSH1 amount   // Push the 'amount' value to the stack
  ADD            // Add 'amount' to the duplicated value
  SSTORE         // Store the result back to storage
  
  ```

### 2. Use calldata instead of memory for function arguments that do not get mutated

  **Example**

  Here the function only reads the data and doesn't modify it, we use calldata to optimize gas costs.

  ```solidity
  contract MyContract {
      function processInput(uint256[] calldata data) external pure returns (uint256) {
          uint256 sum = 0;
  
          for (uint256 i = 0; i < data.length; i++) {
              sum += data[i];
          }
  
          return sum;
      }
  }
  ```

### 3. Using `private` rather than `public` for constants saves gas
### 4. Use != 0 instead of > 0 for unsigned integer comparison
### 5. State variables should be cached in stack variables rather than re-reading them from the storage

  **Example**

```solidity
contract Caching {
    uint256 public cachedVariable;

    function readAndUpdate() external {
        uint256 localVar = cachedVariable;  // Cache state variable in local stack variable
        localVar++;  // Perform operations on the cached value
        cachedVariable = localVar;  // Update the state variable with the modified value
    }
}

```

### 6. Use assembly to check for address(0)

  **Example**

  ```solidity
  function isZeroAddress(address _addr) external pure returns (bool) {
      bool isZero;
  
      assembly {
          isZero := iszero(_addr)
      }
  
      return isZero;
  }
  
  ```

Thank you for reading ✌🏻

**Please feel free to share your feedback & stay tuned for the upcoming “Gas Optimization Deep Dive v3 ✅**

> Written By

- Name: Hemendra Sharma
- Twitter: [CodeNinja04](https://twitter.com/Codeninja04)
