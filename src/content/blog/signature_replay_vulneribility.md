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

> The signature replay vulnerability in the `VulnerableContract` allows an attacker to reuse a valid signature multiple times. Once an attacker acquires a valid signature for a specific update, they can repeatedly call the `setValue` function with the same signature to modify the value multiple times. This unauthorized and unintended behavior occurs because the contract doesn't have safeguards to prevent the reuse of the same signature.

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

We store the hash of each executed transaction and prevent re-execution of the same transaction. The `HashMitigatedContract` prevents the signature replay attack by tracking executed transactions through a mapping that stores the transaction hash
<br>

check this part in `setValue` function -->
`require(!_isTransactionExecuted(txHash), "Transaction has already been executed");`<br>

Before executing a transaction, the contract checks if the transaction hash has already been marked as executed, ensuring that a transaction can only be executed once. After a successful execution, the contract marks the transaction as executed, preventing it from being replayed in the future. This simple but effective mitigation ensures that each signature can only be used once, maintaining the integrity of the contract state and security.

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

The `ExpiryMitigatedContract` introduces an expiry timestamp to ensure that a transaction can only be executed before a certain time. This approach helps prevent replay attacks by setting a time limit on the validity of a signature. When the setValue function is called, it checks whether the current block timestamp is before or equal to the provided \_expiry time. If the transaction has expired, the contract rejects it with the message "Transaction has expired." This ensures that a transaction can only be executed within the specified time frame. This mitigation provides an additional layer of security to prevent replay attacks by making the signatures time-sensitive and limiting their validity based on the expiration timestamp.

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

> There can be other attacks like cross chain replay in that case valid signature in one chain can be used in another chain and to prevent this kind of attack we need to use `chainId` in signature

Thank you for reading ✌🏻

> Written By

- Name: Hemendra Sharma
- Twitter: [CodeNinja04](https://twitter.com/Codeninja04)
