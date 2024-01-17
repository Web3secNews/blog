---
author: Ariant Ahamid
pubDatetime: 2024-01-17T09:04:37Z
title: Ledger Hack Analysis
tags:
  - hack
  - postmortem
  - analysis
description: Dependency Library compromised  
---

*Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on **[web3sec.news](https://web3sec.news/)***

*The ultimate open-source platform for sharing Web3 security insights. Publish your **[blog topics](https://github.com/Web3secNews/blog)**, from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.*

**[Join the vibrant Web3 security community today 🤝](https://discord.com/invite/CseAxvtrZ3)**


### Introduction:

On December 14, 2023, a seismic event reverberated through the Ethereum ecosystem, casting major applications like Zapper, SushiSwap, Phantom, Balancer, and Revoke.cash into the tumult of a security breach linked to a compromised Ledger. This incident not only spotlights the vulnerability of decentralized finance (DeFi) but also underscores the urgent need for enhanced security measures.

Impacted dApps, including Zapper, SushiSwap, Phantom, Balancer, and Revoke.cash, now face potential losses exceeding $5,50,000 due to this unique "supply chain attack" on Ledger's Connect Kit.

### Decoding Vulnerabilities in Ledger's Software:
The Connect Kit compromise revealed serious issues in Ledger's software, similar to the SolarWinds hack. This kit controlled third-party access to cryptocurrency on Ledger's hardware. When compromised, it exposed flaws in Ledger's software, affecting all connected services.

**For instance**, if a user like Alice used the compromised Connect Kit on Zapper, malicious code could alter a transaction, sending funds to the attacker's wallet. This not only risks Alice's assets but also endangers the entire Zapper platform.

### Security Breach Timeline:
1. A former Ledger employee got tricked in a phishing attack, giving the attacker access to their NPMJS account. 

2. Using the stolen credentials, the attacker uploaded a compromised version of the Ledger Connect Kit (versions 1.1.5, 1.1.6, and 1.1.7) on NPMJS. This fake kit has code that redirects funds to the attacker's wallet via a deceitful WalletConnect project, a company providing tools for connecting crypto wallets to web-based decentralized applications (dApps).

3. Responding swiftly to the compromise, Ledger, the esteemed Paris-based crypto hardware wallet manufacturer, eradicated the malicious code by 13:35 UTC. Users were promptly advised to "Clear Sign" transactions, fortifying security in their interactions with the company's website and software.

![Attacker's Wallet](https://github.com/Web3secNews/blog/blob/main/public/media/ledger_etherscan.png?raw=true)

Fig: The attacker's wallet 

### Mitigation Strategies:
Users are advised to exercise caution when signing unknown transactions and verify wallet app payloads for recognized patterns. Regularly clear browser caches to prevent compromised libraries from being accessed. For Ledger security, enhance phishing training, enforce Multi-Factor Authentication (MFA), and implement least privilege access control. Conduct rigorous code reviews and audits, especially for software updates and external libraries.

Implement code signing for Ledger Connect Kit updates and secure dependency management practices. Employ automated security monitoring tools for continuous threat detection in software and infrastructure.

![Official Announcement](https://github.com/Web3secNews/blog/blob/main/public/media/ledger_tweet.png?raw=true)


### Conclusion:
The Ledger security breach, unveiling a plumbing problem in its software management, serves as a stark reminder for the crypto industry to collectively reinforce security practices against potential supply chain attacks. As affected parties assess the aftermath and collaborate on recovery, this incident underscores the pivotal role security plays in upholding the integrity of decentralized applications and the broader blockchain ecosystem.

This blog was written in collaboration with [Arian Tahamid](https://twitter.com/ArianTahamid)

Thank you for reading ✌🏻
