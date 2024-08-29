import {
  createTorchSDK,
  QuerySwapParams,
  AssetType,
  SwapType,
  Asset,
  TorchError,
  ALL_TOKENS,
} from '@torch-finance/v1-sdk';

export async function performSwap() {
  const torchSDK = createTorchSDK();
  const tsTON = Asset.jetton('EQCkWxfyhAkim3g2DjKQQg8T5P4g-Q1-K_jErGcDJZ4i-vqR');
  const stTON = Asset.jetton('EQDNhy-nxYFgUqzfUzImBEP67JqsyMIcyk2S5_RwNNEYku0k');
  const TON = Asset.ton();

  const swapParams: QuerySwapParams = {
    swapType: SwapType.ExactIn,
    assetIn: Asset.jetton('EQDNhy-nxYFgUqzfUzImBEP67JqsyMIcyk2S5_RwNNEYku0k'),
    assetOut: Asset.ton(),
    amount: '0.01',
    maxSlippage: '0.01',
  };
  try {
    // Get All Assets
    const allAssets = await torchSDK.swaps.getAssets();
    console.log('All Assets:', allAssets);

    // Query Swap
    console.log(`Swap ${swapParams.amount} ${swapParams.assetIn.id} to ${swapParams.assetOut.id}`);
    const queryResult = await torchSDK.swaps.querySwap({
      ...swapParams,
    });
    console.log('Query Swap Result:', queryResult);

    // Build Swap
    const buildResult = await torchSDK.swaps.buildSwap({
      ...swapParams,
      userAddress: 'UQDrRQlKRo5J10a-nUb8UQ7f3ueVYBQVZV9X8uAjmS7gH-o4',
    });
    console.log('Build Swap Result:', buildResult);
  } catch (error: any) {
    console.error('Error:', error.type, error.message);
  }
}

performSwap();
