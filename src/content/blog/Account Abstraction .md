---

title: ACCOUNT Abstraction And EIP 4337
pubDatetime: 2023-10-04T05:50:19Z



tags:
  - web3sec
  - Account Abstraction
description: EIP -4337 and its use cases with Account Abstraction to provide More Security And  Decentralization
--- 

---


Account abstraction allows users to customize how they interact with the Ethereum blockchain according to their needs. Normally, users interact with Ethereum using an externally-owned account (EOA) or contract account associated with one unique private key. Anyone with a private key can execute arbitrary transactions with no restrictions.

![](https://assets-global.website-files.com/6267eac265e445963ae53e81/63c6469b1eafa48078f9b8a6_%231-Inside%20article.jpg align="left")

With account abstraction, users can have more granular control. This could be requiring multiple signatures to trigger a transaction, enabling social recovery, or implementing restrictions on the smart contracts that the user account is allowed to interact with.

An important thing to understand about account abstraction is that it doesn’t change the consensus layer of the Ethereum blockchain. Instead, it introduces a new way for users to interact with Ethereum via a separate UserOperation Mempool and the account abstraction architecture described in this article.

### **Ethereum History**

Ethereum has two types of accounts: Externally-owned accounts (EOAs) and Smart Contracts.

1. **EOAs** are the traditional accounts that you create with a wallet like MetaMask. They have a hidden private key and a derived public address and are what most users use to interact with the blockchain.
    
2. **Smart contracts** are programmable applications that can perform transactions but do not have an associated private key. EOAs or other smart contracts can transact with these entities, performing a predetermined set of actions based on their program logic. Many DeFi and wallet applications on Ethereum are built on smart contract accounts.
    

![](https://assets-global.website-files.com/6267eac265e445963ae53e81/63c6476b6d2554abfd85c8fe_%233-Inside%20article.jpg align="left")

[EIP-86](https://eips.ethereum.org/EIPS/eip-86), which introduced a “forwarding contract” to abstract signature verification and nonce, and allow for signature certifications schemes other than ECDSA, and [EIP-2938](https://eips.ethereum.org/EIPS/eip-2938#replay-protection-1) in 2020, which would have introduced Ethereum protocol changes that would allow transactions to start from a smart contract instead of an EOA. However, both these proposals ultimately failed because they would require significant changes to core Ethereum, and thus significant development time.

### **EIP-4337**

Most recently in 2021, Vitalik and others submitted [**EIP-4337**](https://eips.ethereum.org/EIPS/eip-4337), which introduces AA without any changes to the core Ethereum (and thus does not require a fork). Instead, it proposes the creation of a higher-level system, a separate mempool.

## **Future of Ethereum with Account Abstraction**

As we look toward the future of Ethereum and blockchain technology, the concept of account abstraction emerges as a critical innovation. It not only signifies an evolution in the flexibility, security, and user-friendliness of Ethereum, but it also brings us one step closer to a future where blockchain technology is deeply woven into the fabric of our digital lives.

Account abstraction is a powerful tool that promises to enhance the Ethereum experience, opening up a world of possibilities for users and developers alike. It marks a shift away from rigid transaction rules, allowing for a more customizable and interactive blockchain environment.

Through EIP-4337 and its implementation on the Mainnet, the Ethereum community showcases its commitment to continuous innovation. This proposal cleverly circumvents the need for any changes to the Ethereum consensus protocol, thereby facilitating a smoother transition toward its implementation on the Ethereum mainnet.

## **How Account Abstraction Works**

There are a number of key technical components of account abstraction, including:

* UserOperation
    
* Bundler
    
* Entry Point
    
* Account contract (and its associated `Account Factory` contract)
    
* Paymaster
    

The ***UserOperation*** is an ABI-encoded structure. It describes the transaction executed by the user. They are not allowed to access any information that alter like current blocktime , number, hash. They are only allowed to access data related to sender address. They are pseudo-transaction objects that express a user's intent.

Below data is from Ethereum organization with the source code availability)

<table><tbody><tr><td colspan="1" rowspan="1"><p><code>sender</code></p></td><td colspan="1" rowspan="1"><p><code>address</code></p></td><td colspan="1" rowspan="1"><p>The account making the operation</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>nonce</code></p></td><td colspan="1" rowspan="1"><p><code>uint256</code></p></td><td colspan="1" rowspan="1"><p>Anti-replay parameter (see “Semi-abstracted Nonce Support” )</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>initCode</code></p></td><td colspan="1" rowspan="1"><p><code>bytes</code></p></td><td colspan="1" rowspan="1"><p>The initCode of the account (needed if and only if the account is not yet on-chain and needs to be created)</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>callData</code></p></td><td colspan="1" rowspan="1"><p><code>bytes</code></p></td><td colspan="1" rowspan="1"><p>The data to pass to the <code>sender</code> during the main execution call</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>callGasLimit</code></p></td><td colspan="1" rowspan="1"><p><code>uint256</code></p></td><td colspan="1" rowspan="1"><p>The amount of gas to allocate the main execution call</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>verificationGasLimit</code></p></td><td colspan="1" rowspan="1"><p><code>uint256</code></p></td><td colspan="1" rowspan="1"><p>The amount of gas to allocate for the verification step</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>preVerificationGas</code></p></td><td colspan="1" rowspan="1"><p><code>uint256</code></p></td><td colspan="1" rowspan="1"><p>The amount of gas to pay for to compensate the bundler for pre-verification execution, calldata and any gas overhead that can’t be tracked on-chain</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>maxFeePerGas</code></p></td><td colspan="1" rowspan="1"><p><code>uint256</code></p></td><td colspan="1" rowspan="1"><p>Maximum fee per gas (similar to <a target="_blank" rel="noopener noreferrer nofollow" href="https://eips.ethereum.org/EIPS/eip-1559" style="pointer-events: none">EIP-1559</a> <code>max_fee_per_gas</code>)</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>maxPriorityFeePerGas</code></p></td><td colspan="1" rowspan="1"><p><code>uint256</code></p></td><td colspan="1" rowspan="1"><p>Maximum priority fee per gas (similar to EIP-1559 <code>max_priority_fee_per_gas</code>)</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>paymasterAndData</code></p></td><td colspan="1" rowspan="1"><p><code>bytes</code></p></td><td colspan="1" rowspan="1"><p>Address of paymaster sponsoring the transaction, followed by extra data to send to the paymaster (empty for self-sponsored transaction)</p></td></tr><tr><td colspan="1" rowspan="1"><p><code>signature</code></p></td><td colspan="1" rowspan="1"><p><code>bytes</code></p></td><td colspan="1" rowspan="1"><p>Data passed into the account along with the nonce during the verification step</p></td></tr></tbody></table>

![pasted image 0](https://images.ctfassets.net/v0qht4wq59vi/6daqeWjFnsiM0c7M7HyjiG/b9fa0c9fda61d27616318bdb0217d198/pasted_image_0.png align="left")

The ***Bundler*** is a block builder that bundles multiple UserOperation from the separate UserOperation mempool and sends the bundle to the `Entrypoint` contract, Not all blockbuilders on the network are bundlers.

Simulation Rationale

In order to add a UserOperation into the mempool and then later to the bundel, we need to "stimulate" its validation to make sure it is valid, and that it is capable o playing for its own execution . in addition , we need to verify that the same will hold true when executed on-chain. A useroperation is not allowed to access any information that might change between simulation and execution, such as current blocktime , number, hash, etc. There are 3 special contracts that interact with the account: the factory (initcode) that deploys the contract , the paymaster that can pay or the gas, and signature aggregator

(***The Highlighted address is a ERC 4337 transaction Bundler***)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1696269568240/cf7eb8f5-1cbb-4c93-a295-2021d499c7e5.png align="center")

### EntryPoint:

The ***EntryPoint*** contract is a singleton smart contract on Ethereum that handles the verification and execution of all bundles of user operations.

The ***Account contract*** is the smart contract wallet of the user that performs signature verification and processes transactions on behalf of the user. The `Account Factory` contract creates the Account contract.

The ***Paymaster*** contract is an optional smart contract that can sponsor gas fees for user account contracts, so users without any ETH to pay for gas fees can still interact with Ethereum.

Vitalik Buterin has summarized the architecture and high-level control flow of account abstraction in the two images below.

Account abstraction architecture. Source: [**Ethereum Improvement Proposals**](https://eips.ethereum.org/EIPS/eip-4337)

![pasted image 0 (1)](https://images.ctfassets.net/v0qht4wq59vi/7n6K88cFs2x43DBd8MlO2C/e78f970661ccdd8943151e98c5e67f22/pasted_image_0__1_.png align="left")

### Paymaster:

They can agree to sponser a transaction for an account.

* application developers can easily subsidize fees for their users;
    
* users can pay gas fees with ERC-20 tokens or off-chain payment methods like credit cards or other subscription services;
    
* On-chain credit services
    

```solidity
function validatePaymasterUserOp
    (UserOperation calldata userOp, bytes32 userOpHash, uint256 maxCost)
    external returns (bytes memory context, uint256 validationData);

function postOp
    (PostOpMode mode, bytes calldata context, uint256 actualGasCost)
    external;

enum PostOpMode {
    opSucceeded, // user op succeeded
    opReverted, // user op reverted. still has to pay for gas.
    postOpReverted // user op succeeded, but caused postOp to revert
}
```

```solidity
// add a paymaster stake (must be called by the paymaster)
function addStake(uint32 _unstakeDelaySec) external payable

// unlock the stake (must wait unstakeDelay before can withdraw)
function unlockStake() external

// withdraw the unlocked stake
function withdrawStake(address payable withdrawAddress) external
```

There are currently [two common types of paymasters according to Account Abstraction development firm StackUp:](https://docs.stackup.sh/docs)

* **Verifying Paymaster:** provide gas abstractions linked to an off-chain process. For example, it can enable users to pay for their transaction fees with a credit card or subscription service without sacrificing custody of their account.
    
* **Deposit Paymaster:** provide gas abstractions linked to an ERC-20 token on-chain.
    

### Aggregator:

Accounts can use the signature aggregators to reduce many signatures into one.

```solidity
function aggregateSignatures (
bytes[] calldata signaturesForAggregation
) external view returns (
bytes memory aggregatedSignature
);
```

```solidity
.function validateSignatures(
UserOperation[] calldata userOps,bytes calldata signature
) external view;
```

## **Embracing the Future of Ethereum with Account Abstraction**

As we look toward the future of Ethereum and blockchain technology, the concept of account abstraction emerges as a critical innovation. It not only signifies an evolution in the flexibility, security, and user-friendliness of Ethereum, but it also brings us one step closer to a future where blockchain technology is deeply woven into the fabric of our digital lives.

Account abstraction is a powerful tool that promises to enhance the Ethereum experience, opening up a world of possibilities for users and developers alike. It marks a shift away from rigid transaction rules, allowing for a more customizable and interactive blockchain environment.

Through EIP-4337 and its implementation on the Mainnet, the Ethereum community showcases its commitment to continuous innovation. This proposal cleverly circumvents the need for any changes to the Ethereum consensus protocol, thereby facilitating a smoother transition toward its implementation on the Ethereum mainnet.

Despite the increased flexibility AA provides, the extensibility of transactions also increases the surface area for attack vectors — every component needs to be secure individually and holistically. As the changes in EIP-4337 may not be backward compatible with older smart contract wallets, migrating to the new standard can introduce unforeseen bugs or security risks. If this process causes the new smart contract wallet to become vulnerable, attackers can transfer funds out of the abstracted account, circumventing EOAs or private keys.

‍

Additionally, the new architecture requires all wallets to send transactions to a global entry point contract. As a result, this entry point needs to be robust and well-protected as it needs to ensure that all the transactions received are appropriately signed and validated.

‍

Some other potential issues with account abstraction include higher gas fees - smart contract wallets might require a lot of processing power to execute – and lack of true cross-chain compatibility. Smart contract wallets would have to be deployed separately for each chain, and most current attempts to implement multi-chain support are complex.

### ‍[Use cases Of AA:](https://blog.ambire.com/account-abstraction-use-cases/)

### **Seedless Account**

AA eliminates this risk and offers a secure set-up for private keys through the account's programmable logic.

Benefit: increased security & ease of use for Web3 account access

### **New Web Authentication Standard**

When the WebAuthn standard is integrated, private key authentication is built into browser logic. Smart contract wallets interact with these browsers and recognize the private key, leveraging AA to match/confirm it. This lets the wallet interact directly with the application without inputting login data. It simplifies login process on multiple platforms.

### **Multi-Signature Authorization**

Sophisticated signature schemes, ulti-signature authorization allows multiple parties to control a single account, providing additional security and control. This is particularly useful for organizations or groups where decisions must be made collectively. Signers can be added or removed without a limit (as opposed to [MPC wallets](https://blog.ambire.com/best-mpc-wallets/), which can only define a signer set once).

### **Support For Quantum-Secure Algos**

Smart accounts are not only bound to ECDSA signatures (the only ones used by EOAs), and their custom logic is programmable, so they will be able to implement quantum-secure signature algorithms.

### Meta Transaction x AA:

*Problems with the meta transaction is :*

* Extra Gas Cost o 21,000/transaction
    
* Need to figure out who will pay and connect.
    
* Censorship Vector
    

[*AA over Meta Transactions :*](https://www.alchemy.com/overviews/4337-vs-2771#:~:text=While%20Meta%20Transactions%20require%20updates,preferred%20option%20over%20Meta%20Transactions.)

* No Smart Contract Changes are Required.
    
* Frictionless Switching Between Bundler and Paymaster Services.
    
* No need to adopt Proprietary Relayers.
    
* No Developer Tooling Lock-in.
    
* More Decentralization.
    

### Does AA compete with MPC?

MPC wallets break a single key into individual shards. This way, rather than a single owner having to be responsible for a private key, multiple parties can hold partitions of the private key. With threshold signatures, a subset of them can come together to sign a transaction.

*&lt;Mempool is a buffer that holds data on unconfirmed transactions that have yet to be added to the blockchain.&gt;*

**About the Writer**

- Name: Saurabh Sisodia
- GitHub: [sskninja](https://github.com/sskninja)
- Twitter: [@Saurabh33838818](https://twitter.com/Saurabh33838818) 