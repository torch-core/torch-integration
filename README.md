# Torch Finance SDK Integration Guide

This guide provides instructions for integrating the Torch Finance SDK into your project. The SDK allows you to perform various DeFi operations such as querying and executing swaps on the Torch Finance platform.

## Table of Contents

- [Torch Finance SDK Integration Guide](#torch-finance-sdk-integration-guide)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Performing a Swap](#performing-a-swap)
    - [1. Initialize the SDK](#1-initialize-the-sdk)
    - [2. Define Swap Parameters](#2-define-swap-parameters)
    - [3. Query the Swap](#3-query-the-swap)
    - [4. Build the Swap Transaction](#4-build-the-swap-transaction)

## Installation

To install the Torch Finance SDK, use npm or yarn:

```bash
npm install @torch-finance/v1-sdk@0.0.39
```

or

```bash
yarn add @torch-finance/v1-sdk@0.0.39
```

## Quick Start

Below is a quick example of how to set up and use the Torch Finance SDK to perform a swap.

```typescript
import {
  createTorchSDK,
  QuerySwapParams,
  AssetType,
  SwapType,
  Asset,
  TorchError,
  ALL_TOKENS,
} from "@torch-finance/v1-sdk";

export async function performSwap() {
  const torchSDK = createTorchSDK();
  const tsTON = Asset.jetton(
    "EQCkWxfyhAkim3g2DjKQQg8T5P4g-Q1-K_jErGcDJZ4i-vqR"
  );
  const stTON = Asset.jetton(
    "EQDNhy-nxYFgUqzfUzImBEP67JqsyMIcyk2S5_RwNNEYku0k"
  );
  const TON = Asset.ton();

  const swapParams: QuerySwapParams = {
    swapType: SwapType.ExactIn,
    assetIn: stTON, // Asset in: stTON
    assetOut: Asset.ton(), // Asset out: TON
    amount: "0.01", // If the swap type is ExactIn, the amount represents the quantity of stTON being input. If the swap type is ExactOut, the amount represents the expected quantity of TON to be received.
    maxSlippage: "0.01", // Max slippage: 1%
  };

  try {
    // Get all available assets
    const allAssets = await torchSDK.swaps.getAssets();
    console.log("All Assets:", allAssets);

    // Query the swap
    console.log(
      `Swap ${swapParams.amount} ${swapParams.assetIn.id} to ${swapParams.assetOut.id}`
    );
    const queryResult = await torchSDK.swaps.querySwap(swapParams);
    console.log("Query Swap Result:", queryResult);

    // Build the swap transaction
    const buildResult = await torchSDK.swaps.buildSwap({
      ...swapParams,
      userAddress: "UQDrRQlKRo5J10a-nUb8UQ7f3ueVYBQVZV9X8uAjmS7gH-o4", // User's wallet address
    });
    console.log("Build Swap Result:", buildResult);
  } catch (error: any) {
    console.error("Error:", error.type, error.message);
  }
}

performSwap();
```

## Performing a Swap

### 1. Initialize the SDK

First, you need to initialize the SDK using the `createTorchSDK` method.

```typescript
const torchSDK = createTorchSDK();
```

### 2. Define Swap Parameters

Create an object that defines the parameters of your swap:

- `swapType`: Defines whether the swap is `ExactIn` or `ExactOut`.
- `assetIn`: The asset being swapped from.
- `assetOut`: The asset being swapped to.
- `amount`: The amount of `assetIn` to be swapped.
- `maxSlippage`: The maximum slippage allowed for the swap.

```typescript
const swapParams: QuerySwapParams = {
  swapType: SwapType.ExactIn,
  assetIn: Asset.jetton("EQDNhy-nxYFgUqzfUzImBEP67JqsyMIcyk2S5_RwNNEYku0k"), // stTON
  assetOut: Asset.ton(), // TON
  amount: "0.01",
  maxSlippage: "0.01",
};
```

### 3. Query the Swap

Use the `torchSDK.swaps.querySwap` method to get the expected output of the swap, considering the current market conditions.

```typescript
const queryResult = await torchSDK.swaps.querySwap(swapParams);
console.log("Query Swap Result:", queryResult);
```

### 4. Build the Swap Transaction

Once the swap is queried, you can build the transaction with the `torchSDK.swaps.buildSwap` method. This method will return the necessary data to execute the swap.

```typescript
// interface TxParam {
//   to: Address;
//   value: bigint;
//   body?: Cell | null;
// }

const buildResult = await torchSDK.swaps.buildSwap({
  ...swapParams,
  userAddress: "USER_ADDRESS", // User's wallet address
});
console.log("Build Swap Result:", buildResult); // buildResult would be TxParams type
```
