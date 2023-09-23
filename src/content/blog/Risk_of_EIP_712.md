---
author: Chinmay Farkya
pubDatetime: 2023-09-23T10:15:32Z
title: Auditors Digest: The risks of EIP712
tags:
  - web3sec
  - EIP
description: Auditors Digest: The risks of EIP712
---

<em>The Auditor’s Digest is a series of articles dedicated to a comprehensive security outlook at various code components in Defi. This article lists vulnerabilities related to the use of EIP712 for typed structured data hashing and signing in Ethereum. More information about EIP712 here.</em>

## Use of wrong contract address in Domain Separator
The Domain separator is made up of TYPE_HASH, name, version, chainID, and verifyingContract. If any of these components is left out or manipulated, then the hashing and verification will not work correctly.

The verifyingContract here should be the contract address that is going to use the signature otherwise if the protocol has signature checks elsewhere, it could result in signature collision and potential replay attacks.

Example : [EIP712 #1](https://solodit.xyz/issues/m-04-verifyingcontract-set-incorrectly-for-eip712-domain-separator-zachobront-none-hook-markdown)
```
function setAddressForEipDomain(address hookAddress) internal {
// Compute `EIP712_DOMAIN_SEPARATOR`
{
uint256 chainId;
assembly {
chainId := chainid()
}
EIP712_DOMAIN_SEPARATOR = keccak256(
abi.encode(
keccak256(
"EIP712Domain(" "string name," "string version," "uint256 chainId," "address verifyingContract"
")"
),
keccak256("Hook"),
keccak256("1.0.0"),
chainId,
hookAddress
)
);
}
}
```
The recommendation is to always use the address(this) in the computation of Domain Separator.

## Signed message data needs to be unique
The combination of message data that is hashed and signed has to be absolutely unique at the contract level. If there is a user-controlled parameter that is not included in the signed data but has parallelly existing values, then it may be used to replay the signature. The signature should only be valid for a very specific bit of information.

Example : [EIP712 #2](https://code4rena.com/reports/2023-01-biconomy#h-07-replay-attack-eip712-signed-transaction)
```
    function execTransaction(
        Transaction memory _tx,
        uint256 batchId,
        FeeRefund memory refundInfo,
        bytes memory signatures
    ) public payable virtual override returns (bool success) {
-------
        bytes32 txHash;
        {
            bytes memory txHashData =
                encodeTransactionData(
                    // Transaction info
                    _tx,
                    // Payment info
                    refundInfo,
                    // Signature info
                    nonces[batchId] // @audit only nonce value is used in the hash calculation
                );
---------
            txHash = keccak256(txHashData);
            checkSignatures(txHash, txHashData, signatures);
        }

```

The recommendation is to determine a correct set of values whose combination is always going to be unique for a transaction so that the same message can’t be reused.

## Domain Separator needs to be recomputed when the name/version is changed
Suppose your contract uses EIP712 to hash a message and verify signatures. The Domain Separator is a defining part of it because of the possibility of cross-contract signature replay.

If there are functions in the contract using EIP712 that can be used to change name/version variables, then the domain Separator should be recomputed inside these functions and cached into the domainSeparator variable to be used in message construction now. If the domain Separator is not updated then the signature verification will always be unsuccessful.

Example : [EIP712 #3](https://solodit.xyz/issues/m-18-if-name-is-changed-then-the-domain-separator-would-be-wrong-code4rena-reserve-reserve-contest-git/)
```
    function _buildDomainSeparator() private view returns (bytes32) {
        return keccak256(abi.encode(TYPE_HASH, _hashedName, _hashedVersion, block.chainid, address(this)));
    }

```
The recommendation is to either make the name/version immutable or recompute and store the Domain Separator every time name/version is changed.

## Signature Replay risk in case of hard fork
There is always a possibility of a chain being hard forked, it has happened with Ethereum in the past. In case of a hard fork, the actual chainID will change but if the contract uses old chainID in domainSeparator, the domain separator will now be invalid. Also, if your protocol is deployed to multiple chains then a valid signature can be replayed on a different chain later.

The domain separator needs to be unique at the chainID to prevent cross-chain signature replay, and the chainID should be cached and checked against to protect from hard fork.

Example : [EIP712 #4](https://code4rena.com/reports/2022-07-golom#m-05-replay-attack-in-case-of-hard-fork)
```
constructor(address _governance) {
        // sets governance as owner
        _transferOwnership(_governance);
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
        EIP712_DOMAIN_TYPEHASH = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes('GOLOM.IO')),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```
The recommendation is to have a way to recompute the Domain separator in case of the chainID changes, or if the protocol is multi-chain.

## Not following the EIP712 specification
When calculating the message digest, it is important to follow the EIP specification for encoding structured data and the function typeHash of where the digest is being used for signature verification.

The spec defines a proper way to encode the message so that it can be broken down by the wallet. Without proper function typeHash and encoded data included in the hashTypedDataV4 digest (while using OZ’s EIP712 implementation), this kind of usage of EIP712 standard is not useful for users because it won’t show the correct data format while signing the transaction in a compatible wallet or integrated tooling.

Example : [EIP712 #5](https://www.codehawks.com/report/cllcnja1h0001lc08z7w0orxx#M-01)
```
bytes32 digest = _hashTypedDataV4(
    keccak256(
        abi.encode(contestId, data)
    )
);
```
All 4 above problems are solved if you use the Openzepplin implementation here, except the problem related to not following the specs.

Follow and stay tuned for more security content :)

> Written By
- Name: Chinmay Farkya
- Twitter: [dev_chinmayf](https://twitter.com/dev_chinmayf)
