---
author: polarzero
pubDatetime: 2023-09-18T06:00:13.911Z
title: "Smart Contract Security: Terminology of a Review"
tags:
  - web3sec
  - audit
  - review
  - tools
description: Clarifying the terminology; security audit/review, static analysis, fuzzing, symbolic execution, formal verification, FREI-PI.
---

![Terminology of a Review - Header image](/public/media/terminology-of-a-review_01.png)

_Navigating the rambling world of smart contract security can be a challenge, especially when you're swarmed with a slew of technical jargon. As I’m relatively new to this landscape, I find myself standing on the shoulders of giants, and I've learned the importance of understanding its specialized terminology. This article, heavily based on references listed at the end, aims to clarify some of these terms._

## **The Power of Words: "Security Reviews" vs. "Security Audits"**

Before we dive into the technicalities, we should address a significant semantic issue: the terminology we use to describe the process of reviewing/auditing the security aspects of a smart contract. While the term “audits” has long been the industry norm, there is a growing movement advocating for the use of “reviews” as a more accurate and adequate description of the process.

### **Why "Security Reviews" Resonate Better**

The term "audit" conjures representations of a checklist-driven process, which would be centered on compliance and conventional methods. It's a word inherited from traditional industries, where the primary purpose is to verify that existing systems satisfy predetermined standards; which fails to accurately communicate the dynamic and nuanced nature of smart contract security.

On the other hand, "security review" suggests a more comprehensive, research-oriented process. Which implies looking for innovative attack vectors and potential vulnerabilities that typical checklists may ignore or overlook. This word is more closely aligned with the investigative nature of smart contract evaluation, which frequently involves pushing the boundaries of what's considered "secure" to uncover hidden risks.

### **The Cultural Shift**

The adjustment from "audits" to "reviews" is not just a semantic issue; it's a cultural change. As the field of smart contract security continues to evolve, the roles we assume will also undergo diversification. We're not just "auditors" ticking off boxes; we're "security researchers" engaged in a rigorous intellectual quest to fortify the decentralized ecosystem. In the fast-paced smart contracts landscape, such an evolution indicates a more mature appreciation of what is required to secure complex, dynamic systems.

## **The Toolbox: Understanding Key Techniques**

### **Static Analysis: Preliminary Code Assessment**

Static analysis is kind of a spell-checker for the code, which identifies common errors without executing the program. While this is a good starting point, it's nowhere near infallible. Static analysis can catch syntax errors and some vulnerabilities, but can't predict how the contract will behave under different conditions.

Tools like [Slither](https://github.com/crytic/slither) perform static analysis at the Solidity level, while [Mythril](https://github.com/Consensys/mythril) analyzes EVM bytecode; [Olympix](https://www.olympix.ai/) integrates with VSCode and highlights potential threats in real time during the development process.

### **Fuzzing: Random Testing Techniques**

Fuzzing, or fuzz testing, involves providing random data as inputs during testing. While it might seem chaotic at a first glance, fuzzing is incredibly effective at uncovering unexpected vulnerabilities.

There are two variations: stateless and stateful. *Stateless* fuzzing discards the state of a previous run for the next run, while *stateful* fuzzing keeps the state of the previous run as the starting point for the next one. Invariant tests are essentially stateful fuzzing but with a different name; they focus on verifying the conditions that must always hold true in a system.

Tools like [Echidna](https://github.com/crytic/echidna) and [Harvey](https://consensys.io/diligence/fuzzing/) are often employed for this purpose.

### **Symbolic Execution and Formal Verification: Mathematical Approaches to Code Validation**

Symbolic Execution converts the code into mathematical expressions. This makes it easier to demonstrate their correctness, by using symbolic inputs to represent a set of states and transitions instead of enumerating them individually. As a result, a full study of all conceivable execution routes is feasible without being constrained by testing with actual, imprecise concrete data.

It's a subset of formal verification, a broader field that uses various mathematical techniques to validate code.

Tools like [Mythril](https://github.com/Consensys/mythril) and [Manticore](https://github.com/trailofbits/manticore) typically integrate these methods.

### **The FREI-PI Pattern: A Holistic Perspective on Smart Contract Integrity**

The FREI-PI pattern (Function-Requirements-Effects-Interactions and Protocol-Invariants) offers a comprehensive framework for smart contract *development*. It improves the well-known CEI pattern (Checks-Effects-Interactions), emphasizing the need to consider the whole protocol, not just individual functions. This holistic approach is crucial for both developing robust, secure smart contracts and embracing a “security mindset” that considers the integration of individual components within the larger system. 

[Read this article on Nascent to learn more about the FREI-PI pattern.](https://www.nascent.xyz/idea/youre-writing-require-statements-wrong)

### **The Synergy of Techniques**

While individual methods like fuzzing and formal verification are efficient on their own, it can be rewarding to learn how to use them together for maximum effectiveness. Hybrid fuzzing, for instance, combines fuzzing with symbolic execution to create a “smarter” fuzzer. This interweaving of techniques allows for a more robust and comprehensive security review.

## **Wrapping Up**

It is decisive for any smart contract security researcher to understand these terms and concepts. Thus, I hope this article clarifies this terminology, as it will most likely help when conducting smart contract security ~~audits~~ reviews.



> Written By
- Name: polarzero
- Website: [polarzero.xyz](https://polarzero.xyz/)
- Twitter: [0xpolarzero](https://twitter.com/0xpolarzero)


## **References**

- Tweets from **[@PatrickAlphaC](https://twitter.com/PatrickAlphaC):**
    - [Patrick Collins, on what hybrid-fuzzing is and how to use it, 2022-12-09](https://twitter.com/PatrickAlphaC/status/1601232979627761664);
    - [Patrick Collins, on the key aspects of fuzz testing and (vs) invariant testing, 2023-02-10](https://twitter.com/PatrickAlphaC/status/1624137622510571522);
    - [Patrick Collins, on symbolic execution as a form of formal verification, 2023-03-2023](https://twitter.com/PatrickAlphaC/status/1633525563263533056);
    - [Patrick Collins, on stateless/stateful fuzzing, 2023-04-15](https://twitter.com/PatrickAlphaC/status/1646998628936867843);
    - [Patrick Collins, deeper dive into formal verification and symbolic execution, 2023-04-26](https://twitter.com/PatrickAlphaC/status/1651024851212050433);
    - [Patrick Collins, on why you should always keep the FRE-PI pattern in mind when building smart contracts, 2023-07-06](https://twitter.com/PatrickAlphaC/status/1676969198663401472);
    - [Patrick Collins, on the "Rekt Test" by Trail of Bits, 2023-08-15](https://twitter.com/PatrickAlphaC/status/1691479436741181440).
- Tweets from **[@SpearbitDAO](https://twitter.com/SpearbitDAO):**
    - [Spearbit, on why shifting the narrative and identity from auditors to security researchers is crucial to our industry, 2023-07-18](https://twitter.com/SpearbitDAO/status/1681078061003952129);
    - [Spearbit, a poll on “what do you think web3 security professionals should be referred to as?”, 2023-07-18](https://twitter.com/SpearbitDAO/status/1681361562559184937);
    - [Spearbit, on the desire for terminology change, in the context of a culture embedded in learning and innovation, 2023-07-19](https://twitter.com/SpearbitDAO/status/1681750592719400960);
    - [Spearbit, on traditional security listings in the professional world, 2023-07-22](https://twitter.com/SpearbitDAO/status/1682543938899525632).
- [Rajeev Gopalakrishna, "Audit Techniques & Tools 101", *Secureum*, 2021-11-07](https://secureum.substack.com/p/audit-techniques-and-tools-101);
- [Brock Elmore, "You're writing require statements wrong", *Nascent*, 2023-06-30](https://www.nascent.xyz/idea/youre-writing-require-statements-wrong).
