---
author: Hemendra Sharma
pubDatetime: 2023-07-09T17:29:17Z
title: Gas Optimization Deep Dive v3

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

### 1. Refactor internal function to avoid unnecessary SLOAD

- Here in the below code, the `internalFunction()` reads the value storage slot, which is already read by the externalFunction() before invoking internalFunction(). We can refactor the code to avoid the `unnecessary storage read` in internalFunction() by passing the cached value as a stack variable which is shown in `OptInternalFunction()`.

```solidity
contract MyContract {
    uint256 public value;

    function getValue() external view returns (uint256) {
        return value;
    }

    function internalFunction() internal view returns (uint256) {
        return value + 10;
    }
    // gas used = 3018
    function externalFunction() external view returns (uint256) {
        uint256 val = getValue();
        return internalFunction() + val;
    }

    function OptInternalFunction(uint256 val) internal pure returns (uint256) {
        return val + 10;
    }
    // gas used = 2882
    function OptExternalFunction() external view returns (uint256) {
        uint256 val = getValue();
        return internalFunction(val) + val;
    }

}

```

### 2. Combine multiple mapping into a single mapping using struct

- Combining multiple mappings into a struct optimizes gas usage by grouping related data together and reducing storage operations. It also allows for packing the struct by modifying the data type, resulting in cheaper storage reads as the memory slot becomes warm after the first access.

```solidity
<!-- Original Mapping -->

mapping(uint256 => mapping(uint256 => bool)) public override isEpochClaimed;
mapping(uint256 => uint256) public override rewardsClaimed;

<!-- Optimized Mapping -->

struct EpochInfo {
        uint248 rewardsClaimed;
        bool isEpochClaimed;
    }

mapping(uint256 => mapping(uint256 => EpochInfo)) epochInfo;

```

### 3. Use `do while` rather than `for loop` to save gas

- Using a do while loop instead of a for loop in Solidity can potentially save gas when iterating over a collection or performing repetitive tasks. This is because the do while loop structure allows for more efficient gas usage compared to a for loop, especially when the number of iterations is uncertain.

```solidity
contract Compare {
    uint256[] public numbers;

    function addNumber(uint256 _number) external {
        numbers.push(_number);
    }
    // gas used : 42491
    function DoWhileFun() external {
        uint256 i = 0;
        uint256 sum = 0;

        do {
            sum += numbers[i];
            i++;
        } while (i < numbers.length);
    }
    // gas used : 42701
    function ForLoopFunc() external {
        uint256 sum = 0;

        for (uint256 i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }

    }
}
```

### 4. Avoid emitting unnecessary data and empty data in events

- Do not send transaction data in events like `startBlock` `endBlock` `block.number` we can get this data directly from transaction data

- Do not send any empty parameter in events

### 5 Efficient packing of variables can significantly reduce gas costs

Efficient packing of variables can significantly reduce gas costs by storing multiple variables within a single storage slot

Example 1 (not efficient)

```solidity
uint8 numberOne;        // Storage slot 0
uint256 bigNumber;      // Storage slot 1
uint8 numberTwo;        // Storage slot 2

```

> In this case, each variable occupies its own storage slot, resulting in increased gas costs. When reading or writing values from storage, the entire 256-bit slot is accessed, even if the variable itself requires fewer bits.

Example 2

```solidity
uint8 numberOne;        // Storage slot 0
uint8 numberTwo;        // Storage slot 0
uint256 bigNumber;      // Storage slot 1

```

> Here, we have packed numberOne and numberTwo within the same storage slot, reducing the gas cost. When accessing these variables, only the necessary bits are read or written, saving gas in the process.

Thank you for reading ✌🏻

**Please feel free to share your feedback & stay tuned for the upcoming “Gas Optimization Deep Dive v3 ✅**

> Written By

- Name: Hemendra Sharma
- Twitter: [CodeNinja04](https://twitter.com/Codeninja04)
