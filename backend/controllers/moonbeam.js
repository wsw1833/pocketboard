/* eslint-disable import/no-extraneous-dependencies */
const {
  astar,
  glmr,
  moonbeam,
  astr,
  dot,
  polkadot,
} = require("@moonbeam-network/xcm-config");
const { Sdk } = require("@moonbeam-network/xcm-sdk");
const { Keyring } = require("@polkadot/api");
const { cryptoWaitReady, evmToAddress } = require("@polkadot/util-crypto");
const { ethers } = require("ethers");
const {
  blake2AsU8a,
  encodeAddress,
  blake2AsHex,
} = require("@polkadot/util-crypto");
const { hexToU8a, stringToU8a, u8aConcat } = require("@polkadot/util");
const { createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const moonbeams = require("viem/chains").moonbeam;

const key =
  "0x7f903f465fb358fb26f64d1d72df868c2391a4126f0698567b6dfff884c8c6c5";
//   "keep awful pupil hazard margin hint inmate hockey manual mean tonight brown"

// Moonbeam Signer ===========================================================
const privateKey = key;
const account = privateKeyToAccount(privateKey);

const evmSigner = createWalletClient({
  account,
  chain: moonbeams,
  transport: http(),
});

// =========================================================================

function logBalances(data) {
  console.log(
    `Balance on ${data.source.chain.name} ${data.source.balance.toDecimal()} ${
      data.source.balance.originSymbol
    }`
  );
  console.log(
    `Balance on ${
      data.destination.chain.name
    } ${data.destination.balance.toDecimal()} ${
      data.destination.balance.symbol
    }`
  );
}

function logTxDetails(data) {
  console.log(
    `\nYou can send min: ${data.min.toDecimal()} ${
      data.min.symbol
    } and max: ${data.max.toDecimal()} ${data.max.symbol} from ${
      data.source.chain.name
    } to ${
      data.destination.chain.name
    }. You will pay ${data.source.fee.toDecimal()} ${
      data.source.fee.symbol
    } fee on ${
      data.source.chain.name
    } and ${data.destination.fee.toDecimal()} ${
      data.destination.fee.symbol
    } fee on ${data.destination.chain.name}.`
  );
}

async function fromMoonbeam() {
  console.log("\nTransfer from Moonbeam to Astar\n");
  const ethereumAddress = "0xd2E1a0E5a17343B42fA3381732AC23De337DBaf9";
  const e1 = evmToAddress(evmSigner.account.address);
  const e2 = evmToAddress(ethereumAddress);

  const data = await Sdk()
    .assets()
    .asset(astr)
    .source(moonbeam)
    .destination(astar)
    .accounts(evmSigner.account.address, e2, {
      evmSigner,
    });

  logBalances(data);
  logTxDetails(data);
  const amount = +data.min.toDecimal() * 2;
  //console.log(`Sending from ${data.source.chain.name} amount: ${amount}`);

  // const hash = await data.transfer("0.1");
  // console.log(`${data.source.chain.name} tx hash: ${hash}`);
}

async function main() {
  console.warn = () => null;
  console.clear();
  console.log(`\nMoonbeam address: ${evmSigner.account.address}.`);
  await fromMoonbeam();
}

main()
  .then(() => console.log("done!"))
  .catch(console.error)
  .finally(() => process.exit());
