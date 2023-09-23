---
author: Hemendra Sharma
pubDatetime: 2023-09-23T18:07:05Z
title: Introduction to ERC46426 Tokenized vault standard

tags:
  - web3sec
  - EIP
description: Introduction to ERC46426 Tokenized vault standard
---

<em>Calling all Web3 developers and security enthusiasts! Contribute and gain recognition on [web3sec.news](https://web3sec.news/)

The ultimate open-source platform for sharing Web3 security insights. Publish your [blog topics](https://github.com/Web3secNews/blog),
from the latest news to blockchain tech and audits, and receive feedback and exciting opportunities.</em>

[Join the vibrant Web3 security community today 🤝 ](https://discord.com/invite/CseAxvtrZ3)

## Table of contents


## ERC-4626: Tokenized Vaults

- ERC-4626 establishes a standardized framework for yield-bearing vaults, which are platforms that help users generate returns from their cryptocurrency holdings. By providing a common set of technical guidelines, ERC-4626 simplifies the integration of different strategies across these platforms. This minimizes errors, reduces development efforts, and enhances the overall accessibility of yield-generation mechanisms for both developers and users within various crypto applications. In other words, ERC-4626 is an extension of ERC-20 that adds new functionality to allow users to profit from their stakes

- Yield-bearing vaults are smart contracts designed to let users earn from their cryptocurrency holdings. These vaults work by allowing users to deposit ERC-20 tokens and receive vTokens in return. These vTokens represent their share in the pooled tokens. As these tokens are deployed across various protocols, they generate profits, which users can redeem along with their initial capital.


- These vaults rank and allocate tokens to the most profitable protocols, reserving some for user withdrawals. After profit harvesting, the process repeats. Yield-bearing vaults are versatile and find use in several scenarios:

  - Fundraising Efficiency: Yield-bearing vaults provide an efficient fundraising method for organizations such as DAOs and governmental bodies, enabling them to secure capital without traditional crowdfunding mechanisms.

  - Optimized Crypto Lending: Platforms like Yearn Finance leverage yield-bearing vaults to optimize earnings for users engaging in crypto lending and asset selling, enhancing profit potential.

  - Strategic DCA Vaults: Employing yield-bearing strategies, Dollar Cost Averaging (DCA) vaults enable users to enhance their profits through consistent, gradual investments over time, while benefiting from yield generation.
 

- The two common terms related to vaults are share and assets:
  - Assets : The underlying token managed by the Vault. Has units defined by the corresponding EIP-20 contract.
  - Shares : The token of the Vault. Has a ratio of underlying assets exchanged on mint/deposit/withdraw/redeem as defined by the Vault. simply you will get this token by giving assests to vault as its shares 


Following is interface of ERC4626

```solidity

interface IERC4626 is IERC20, IERC20Metadata {
    event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares);
    event Withdraw(address indexed sender, address indexed receiver, address indexed owner, uint256 assets, uint256 shares);

    // Returns the address of the underlying token used for the Vault.
    function asset() external view returns (address assetTokenAddress);

    // Returns the total amount of managed assets, inclusive of yield and fees.
    function totalAssets() external view returns (uint256 totalManagedAssets);

    // Returns shares for given assets, reflecting the "average-user's" price-per-share.
    function convertToShares(uint256 assets) external view returns (uint256 shares);

    // Returns assets for given shares, reflecting the "average-user's" price-per-share.
    function convertToAssets(uint256 shares) external view returns (uint256 assets);

    // Returns the maximum depositable assets for the receiver.
    function maxDeposit(address receiver) external view returns (uint256 maxAssets);

    // Simulates the effects of a deposit under current conditions.
    function previewDeposit(uint256 assets) external view returns (uint256 shares);

    // Deposits assets, mints shares, and emits Deposit event.
    function deposit(uint256 assets, address receiver) external returns (uint256 shares);

    // Returns the maximum mintable shares for the receiver.
    function maxMint(address receiver) external view returns (uint256 maxShares);

    // Simulates the effects of a mint under current conditions.
    function previewMint(uint256 shares) external view returns (uint256 assets);

    // Mints shares, deposits assets, and emits Deposit event.
    function mint(uint256 shares, address receiver) external returns (uint256 assets);

    // Returns the maximum withdrawable assets for the owner.
    function maxWithdraw(address owner) external view returns (uint256 maxAssets);

    // Simulates the effects of a withdrawal under current conditions.
    function previewWithdraw(uint256 assets) external view returns (uint256 shares);

    // Burns shares, withdraws assets, and emits Withdraw event.
    function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);

    // Returns the maximum redeemable shares for the owner.
    function maxRedeem(address owner) external view returns (uint256 maxShares);

    // Simulates the effects of a redemption under current conditions.
    function previewRedeem(uint256 shares) external view returns (uint256 assets);

    // Burns shares, redeems assets, and emits Withdraw event.
    function redeem(uint256 shares, address receiver, address owner) external returns (uint256 assets);
}

```

Now lets see how deposit and withdraw works

### Deposit Process:

- The user calls the deposit function with the assets they want to deposit and the receiver's address.
- The contract calculates the maximum allowed deposit for the receiver.
- If the desired deposit amount exceeds the maximum allowed, the transaction is rejected.
- The contract calculates the shares the user will receive based on the provided assets using the previewDeposit function.
- The contract transfers the assets from the user to the contract and mints corresponding shares to the receiver using the _deposit function.
- An event is emitted, noting the caller, receiver, deposited assets, and minted shares.

### Withdraw Process:

- The user calls the withdraw function with the assets they want to withdraw, the receiver's address, and the owner's address.
- The contract calculates the maximum allowed withdrawal for the owner.
- If the desired withdrawal amount exceeds the maximum allowed, the transaction is rejected.
- The contract calculates the shares needed to be burned for the desired asset withdrawal using the previewWithdraw function.
- If the caller isn't the owner, the contract ensures the caller has enough shares by using the _spendAllowance function.
- The contract burns the required shares and transfers the specified assets to the receiver using the _withdraw function.
- An event is emitted, noting the caller, receiver, owner, withdrawn assets, and burned shares.

These processes ensure fair and accurate conversion of assets to shares and vice versa within the ERC4626 vault.

- Now lets see how the conversion between assets and shares works. So the functions used for conversions are **convertToShares** and **convertToAssets**
  - ConvertToShares : Takes asset as input and gives output as ```(assets x totalSupply) / totalAssets()```
  - ConvertToAssets : Takes share as input and gives output as ```(shares X totalAssets() / totalSupply )```
  
  >  **shares**: The input amount of shares that the user wants to convert to assets <br> **assets**: The input amount of assets that the user wants to convert to shares. <br> **totalSupply**: The total supply of shares in the vault

Will discuss more in depth  about vulneribilities and secure implementation of vaults in upcoming blogs.
  
Thank you for reading ✌🏻

**Please feel free to share your feedback ✅**

> Written By

- Name: Hemendra Sharma
- Twitter: [CodeNinja04](https://twitter.com/Codeninja04)
