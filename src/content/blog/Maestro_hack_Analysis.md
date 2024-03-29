---
author: Chirag Agrawal
pubDatetime: 2023-11-15T09:55:35Z
title: Maestro Telegram Bot Smart Contract Hack Analysis
tags:
  - hack
  - postmortem
  - analysis
  - smartcontract
  - bot
  - telegram
description: Deep Dive into the External Caller Vulnerability
---

*Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on **[web3sec.news](https://web3sec.news/)***

*The ultimate open-source platform for sharing Web3 security insights. Publish your **[blog topics](https://github.com/Web3secNews/blog)**, from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.*

**[Join the vibrant Web3 security community today 🤝](https://discord.com/invite/CseAxvtrZ3)**


### Introduction:

On October 25, 2023, the Maestro project, which offers crypto tools to Telegram users, suffered a security breach due to insecure external calls inside their Router smart contract. This vulnerability allowed an attacker to select an arbitrary victim's address, execute the 'transferFrom' function, and steal the victim's tokens.

The Maestro Hack was particularly alarming because it **did not require user consent or authorization.** Without approval, an attacker directly accessed and transferred tokens from a victim's address. Let's break down how the exploit happened, and how to prevent it in the future. 

### Smart Contract Hack Intel:

- Hacker’s Address: [0xce6397](https://etherscan.io/address/0xce6397e53c13ff2903ffe8735e478d31e648a2c6)
- Malicious Contract: [0xe6c6e86e0](https://etherscan.io/address/0xe6c6e86e04de96c4e3a29ad480c94e7a471969ab#code)
- Maestro’s compromised contract: [0x80a64c6D](https://etherscan.io/address/0x80a64c6D7f12C47B7c66c5B4E20E72bc1FCd5d9e#code)
- Attack Transaction: [0xc087fbd68](https://explorer.phalcon.xyz/tx/eth/0xc087fbd68b9349b71838982e789e204454bfd00eebf9c8e101574376eb990d92?line=5)
- Notable affected tokens: 
    - $LP
    - $MOG
    - $LMI

![Maestro attack txn](https://github.com/Web3secNews/blog/blob/main/public/media/maestro/1.png?raw=true)

Fig: The attacker's initial transaction 

## External Caller Bug Explained:

An attacker can manipulate a contract's flow and mappings by exploiting a delegatecall bug. This bug allows them to interfere with the contract's execution, even if they are not the contract owner. In a delegatecall, the code from one contract is executed in the context of another contract. When this is abused, the attacker can influence the behavior of the contract, potentially altering its state and outcomes

### Example:

An attacker can use this exploit to steal ERC-20 tokens from a contract by deploying a malicious contract with a function that transfers tokens to an address of their choosing. They then call the function from a random address, triggering the bug and allowing them to transfer all of the tokens in the contract to their own address.

### A step-by-step breakdown:

- The Router 2 contract from Maestro acts as an [ERC1967-style proxy](https://eips.ethereum.org/EIPS/eip-1967), delegating flow to another address. In this setup, the implementation address, where calls are directed can be changed dynamically. This change is typically initiated by the contract owner to update the contract’s logic while retaining its state, making it a more efficient and seamless upgrade.

 ![Proxy Contract](https://github.com/Web3secNews/blog/blob/main/public/media/maestro/2.png?raw=true)

- The attacker discovered that the public function '0x9239127f' in the Router 2 token allowance contract had an internal delegate call to the 'transferFrom' function of the implementation contract (leveraging ERC1967-style proxy).

- When the Maestro team updated the implementation contract, they changed the validation logic on the ‘transferFrom’ function.  Now, it lacked proper input validation for the 'source' address in the calldata.

 ![Tracing transaction](https://github.com/Web3secNews/blog/blob/main/public/media/maestro/3.png?raw=true)

- Think of ‘transferFrom’ like writing a check. There’s a source parameter indicating where the funds are coming from, and a destination parameter indicating who is receiving those funds. Typically, like a bank, the function checks to make sure the check is signed by the person whose money is being transferred. Without this check, anyone can ‘write a check’ for anyone else. 

- This is exactly what happened in the Maestro attack. Without input validation in the 'transferFrom' function of the implementation contract, _the attacker could freely insert any victim's address into the 'source' field of the function_. This action essentially allowed the attacker to initiate a transaction from the victim's perspective within the contract.  

 ![Vulnerable Code](https://github.com/Web3secNews/blog/blob/main/public/media/maestro/4.png?raw=true)

- To exploit the vulnerability, the attacker needed control over the 'source' address in the data sent to the 'transferFrom()' function, which was executed after a delegate call to the '0x9239127f' function in the Router2 contract. However, this control wasn't directly exploitable, as they had to gain access to the 'source' address during the call of the Router 2 contract’s function.

 ![Attack Explained](https://github.com/Web3secNews/blog/blob/main/public/media/maestro/5.png?raw=true)

- To overcome this constraint, the attacker created an exploit contract that duplicated the public function from Router 2. Inside their exploit contract, they executed this duplicated public function

- This manipulation enabled them to re-route the execution flow, granting control over the 'source' address when the proxy contract directed calls to the 'transferFrom' function in the implementation contract.

- By using the above technique, the attacker obtained 280 ETH (about $500K) and took on their profits by transferring them into Railgun, which the attacker then laundered through the Railgun mixer.

- Approximately thirty minutes after the compromise, Maestro replaced the router's logic with a counter contract, patching the vulnerability.

 ![Maestro team instant fixed](https://github.com/Web3secNews/blog/blob/main/public/media/maestro/6.png?raw=true)

### Protection Strategies:

- Protocols can prevent this type of bug by carefully validating calldata on all public functions. In this case, if the Maestro team had ensured that the source address passed in as a function parameter was always equal to the msg.sender, it would have prevented the attack, guaranteeing that only the intended user could call the function.

In the specific case of function 0x9239127f in the Router2 user token allowance contract, this would involve adding a similar validation check to the beginning of the function:

```require(source == msg.sender, "Source address must be equal to msg.sender");```

This would prevent attackers from calling the function with a different source address, thereby preventing them from sending transactions from the victim's point of view.

It is important to note that all publicly accessible functions should be validated in this way, regardless of whether or not they invoke the transferFrom function. This is because any publicly accessible function could potentially be exploited by an attacker to steal assets or modify the contract's state.

### Lessons Learned from the Security Incident?

A contract without a thorough security review is a hack waiting to happen. In this case, it’s unclear whether the Maestro team had audited their contracts, or whether they had integrated security testing into their development cycle. 

This blog was written in collaboration with [Nathan Ostrowski](https://www.octane.security/), If you care deeply about boosting your protocol’s security and reducing your spending on audits, They’ve just started accepting applications for next beta cohort.

Thank you for reading ✌🏻
