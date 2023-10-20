---
author: Hemendra Sharma
pubDatetime: 2023-10-20T14:58:48Z
title: Signature replay vulneribility
description: Signature replay vulneribility
tags:
  - web3sec
  - smartcontracts
  - vulnerability
  - signature replay
---

<em>Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on [web3sec.news](https://web3sec.news/)The ultimate open-source platform for sharing Web3 security insights. Publish your [blog topics](https://github.com/Web3secNews/blog),
from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.
</em>

[Join the vibrant Web3 security community today 🤝 ](https://discord.com/invite/CseAxvtrZ3)

## Table of contents

## Signature Replay

### Understading the vulneribility

> The signature replay vulnerability in the provided `VulnerableContract` arises due to the absence of safeguards against the reuse of the same signature. This flaw allows an attacker to replay a valid signature multiple times, resulting in unintended and unauthorized changes to the contract state.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract VulnerableContract {
    using ECDSA for bytes32;

    address public owner;
    uint public value;

    constructor(address _owner) payable {
        owner = _owner;
    }

    function setValue(uint _newValue, bytes memory _sig) external {
        bytes32 txHash = getTxHash(_newValue);
        require(_checkSig(_sig, txHash), "Invalid signature");

        value = _newValue;
    }

    function getTxHash(uint _newValue) public view returns (bytes32) {
        return keccak256(abi.encodePacked(_newValue));
    }

    function _checkSig(bytes memory _sig, bytes32 _txHash) private view returns (bool) {
        bytes32 ethSignedHash = _txHash.toEthSignedMessageHash();
        address signer = ethSignedHash.recover(_sig);
        return signer == owner;
    }
}
```

### Mitigate the vulneribility

> To mitigate this vulnerability, it is crucial to implement measures such as utilizing expiry timestamps or storing and tracking transaction hashes to ensure the uniqueness and validity of each transaction, thereby preventing unauthorized replay attacks.

There are some ways to prevent this vulneribility

#### 1.By storing transaction hash

We store the hash of each executed transaction and prevent re-execution of the same transaction. In the given contract we can see the condition `require(!_isTransactionExecuted(txHash), "Transaction has already been executed");` this will prevent this attack

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract HashMitigatedContract {
    using ECDSA for bytes32;

    address public owner;
    uint public value;
    mapping(bytes32 => bool) public executedTransactions;

    constructor(address _owner) payable {
        owner = _owner;
    }

    function setValue(uint _newValue, bytes memory _sig) external {
        bytes32 txHash = getTxHash(_newValue);
        require(!_isTransactionExecuted(txHash), "Transaction has already been executed");
        require(_checkSig(_sig, txHash), "Invalid signature");

        value = _newValue;
        _markTransactionExecuted(txHash);
    }

    function getTxHash(uint _newValue) public view returns (bytes32) {
        return keccak256(abi.encodePacked(_newValue));
    }

    function _isTransactionExecuted(bytes32 _txHash) private view returns (bool) {
        return executedTransactions[_txHash];
    }

    function _markTransactionExecuted(bytes32 _txHash) private {
        executedTransactions[_txHash] = true;
    }

    function _checkSig(bytes memory _sig, bytes32 _txHash) private view returns (bool) {
        bytes32 ethSignedHash = _txHash.toEthSignedMessageHash();
        address signer = ethSignedHash.recover(_sig);
        return signer == owner;
    }
}


```

#### 2.By Using expiry timestamp

In another approach we use an expiry timestamp to ensure that a transaction can only be executed before a certain time.

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ExpiryMitigatedContract {
    using ECDSA for bytes32;

    address public owner;
    uint public value;

    constructor(address _owner) payable {
        owner = _owner;
    }

    function setValue(uint _newValue, bytes memory _sig, uint _expiry) external {
        require(block.timestamp <= _expiry, "Transaction has expired");

        bytes32 txHash = getTxHash(_newValue, _expiry);
        require(_checkSig(_sig, txHash), "Invalid signature");

        value = _newValue;
    }

    function getTxHash(uint _newValue, uint _expiry) public view returns (bytes32) {
        return keccak256(abi.encodePacked(_newValue, _expiry));
    }

    function _checkSig(bytes memory _sig, bytes32 _txHash) private view returns (bool) {
        bytes32 ethSignedHash = _txHash.toEthSignedMessageHash();
        address signer = ethSignedHash.recover(_sig);
        return signer == owner;
    }
}


```

> There can be other attacks like cross chain replay in this case valid signature in one chain can be used in another chain and to prevent this kind of attack we need to use `chainId` in signature

Thank you for reading ✌🏻

> Written By

- Name: Hemendra Sharma
- Twitter: [CodeNinja04](https://twitter.com/Codeninja04)
