const { Sdk } = require("@moonbeam-network/xcm-sdk");
const { createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { moonbeam, astar } = require("viem/chains");
const { Keyring } = require("@polkadot/api");
const { cryptoWaitReady } = require("@polkadot/util-crypto");

const privateKey = "INSERT_PRIVATE_KEY"; // Private key for Moonbeam account
const account = privateKeyToAccount(privateKey);

const evmSigner = createWalletClient({
  account,
  chain: moonbeam,
  transport: http(),
});

const moonbeamKeyring = new Keyring({
  ss58Format: "INSERT_MOONBEAM_SS58_FORMAT", // Moonbeam SS58 format
  type: "sr25519",
});
const moonbeamPair = moonbeamKeyring.createFromUri(privateKey);

const astarKeyring = new Keyring({
  ss58Format: "INSERT_ASTAR_SS58_FORMAT", // Astar SS58 format
  type: "sr25519",
});
const astarPair = astarKeyring.createFromUri("ASTAR_PRIVATE_KEY"); // Private key for Astar account

const sdkInstance = new Sdk();

const transferAssets = async () => {
  try {
    await cryptoWaitReady();

    // Get the transfer data for sending assets from Moonbeam to Astar
    const data = await sdkInstance.getTransferData({
      destinationAddress: evmSigner.account.address,
      destinationKeyOrChain: "moonbeam",
      keyOrAsset: "dot", // Asset to transfer (e.g., DOT)
      polkadotSigner: moonbeamPair, // Signer for Moonbeam
      sourceAddress: astarPair.address,
      sourceKeyOrChain: "astar",
      evmSigner,
    });

    // Submit the transfer
    const result = await sdkInstance.transfer(data);

    console.log("Transfer successful:", data);
  } catch (error) {
    console.error("Error transferring assets:", error);
  }
};