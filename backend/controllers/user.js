const nftapi =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk3ZjhlZEE3NGVmNmUwRDJCNTBFNDlGZjg5RjQ3YTEwMGQyREI4ZDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNDkxNzc4MTA2MiwibmFtZSI6InRlc3Qga2V5In0._U014CQm80JeQOepR30_1q3U1thKx9hS-lNj0REgQis";

const User = require("../models/user");
const Token = require("../models/general");
const bip39 = require("bip39");
const ethers = require("ethers");
const axios = require("axios");
const { default: Web3 } = require("web3");
const rpc = "https://rpc.api.moonbeam.network";
const { NFTStorage, File, Blob } = require("nft.storage");
const { Sdk, init } = require("@moonbeam-network/xcm-sdk");
const { astar, moonbeam, astr } = require("@moonbeam-network/xcm-config");
const { createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const moonbeams = require("viem/chains").moonbeam;
const { Keyring } = require("@polkadot/api");
const { cryptoWaitReady, evmToAddress } = require("@polkadot/util-crypto");
const abi = require("../abi.json");
const address = "0x5A4F88fC0E32cAC942a41A9bF54CC0afAF32a4E8";
const contractABI = require("../erc20.json");

function generateRecoveryPhrase() {
  const mnemonic = bip39.generateMnemonic();
  return { mnemonic };
}

function importWalletFromRecoveryPhrase(recoveryPhrase) {
  const wallet = ethers.Wallet.fromPhrase(recoveryPhrase);
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  return { mnemonic: recoveryPhrase, privateKey, address };
}

const uploadToNFTStorage = async (file) => {
  try {
    const token = nftapi;
    const client = new NFTStorage({ token });
    const image = new File(file);
    const cid = await client.store(image);
    const url = `https://${cid}.ipfs.nftstorage.link`;
    return url;
  } catch (error) {
    console.error("Error uploading file to nft.storage:", error);
    throw error;
  }
};

exports.createPhrase = async (req, res) => {
  try {
    const walletInfo = generateRecoveryPhrase();
    const recoveryPhrase = walletInfo.mnemonic;

    res.status(201).json({ recoveryPhrase });
  } catch (error) {
    console.error("Error during wallet creation:", error);
    res.status(500).json({ error: "An error occurred during wallet creation" });
  }
};

exports.createWallet = async (req, res) => {
  const { recoveryPhrase } = req.body;
  try {
    const walletInfo = importWalletFromRecoveryPhrase(recoveryPhrase);
    const privateKey = walletInfo.privateKey;
    const walletAddress = walletInfo.address;
    res.status(201).json({ privateKey, walletAddress });
  } catch (error) {
    console.error("Error during wallet creation with recovery phrase:", error);
    res.status(500).json({ error: "An error occurred during wallet creation" });
  }
};

// ============== GET BALANCE API ==================//

exports.getBalance = async (req, res) => {
  const { walletAddress } = req.body;
  let provider = new Web3(rpc);
  try {
    const balance = await provider.eth.getBalance(walletAddress);
    const resolvedBalance = (Number(balance) / 1e18).toFixed(6);
    res.json({
      walletAddress: walletAddress,
      balance: resolvedBalance,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching balance" });
  }
};

// SIGNUP API
exports.signup = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const existinguser = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (existinguser) {
      return res.status(401).json({ error: "User exists" });
    }
    const user = new User({
      walletAddress: walletAddress.toLowerCase(),
    });
    await user.save();
    res.json({ user: user });
  } catch (error) {
    console.error("updating user error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// CREATE PROFILE
exports.createProfileService = async (req, res) => {
  try {
    const { walletAddress, name, bio, ImageURL, interest, twitter } = req.body;
    let user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if serviceProvider field exists, if not, initialize it
    if (!user.serviceProvider) {
      user.serviceProvider = {};
    }

    // Update the serviceProvider fields
    user.serviceProvider.name = name;
    user.serviceProvider.bio = bio;
    user.serviceProvider.ImageURL = ImageURL;
    user.serviceProvider.interest = interest;
    user.serviceProvider.twitter = twitter;

    await user.save();
    res.json({ user: user });
  } catch (error) {
    console.error("Updating profile error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// CREATE CLIENT PROFILE
exports.createProfileClient = async (req, res) => {
  try {
    const { walletAddress, companyName, website, logo, interest, twitter } =
      req.body;
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.client) {
      user.client = {};
    }
    user.client.walletAddress = walletAddress;
    user.client.companyName = companyName;
    user.client.website = website;
    user.client.logo = logo;
    user.client.interest = interest;
    user.client.twitter = twitter;
    await user.save();
    res.json({ user: user });
  } catch (error) {
    console.error("updating profile error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

//GET PROFILE

exports.getProfile = async (req, res) => {
  const { walletAddress } = req.body;
  try {
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (!user) {
      return res.status(400).json({ error: "User doesnt exist" });
    }
    res.status(201).json({ user });
  } catch (error) {
    console.error("Error during Login:", error);
    res.status(500).json({ error: "An error occurred during Login" });
  }
};

// CREATE BOUNTY

exports.createBounty = async (req, res) => {
  try {
    const {
      walletAddress,
      title,
      interest,
      description,
      attachment,
      dueDate,
      badge,
      reward,
      bountyOwner,
    } = req.body;
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ error: "User not exists" });
    }
    const newBounty = {
      title,
      interest,
      description,
      attachment,
      createdBy: user.client.companyName,
      dueDate,
      badge,
      reward,
      bountyOwner: user.walletAddress,
    };
    user.bounty.push(newBounty);
    await user.save();
    res.json({ user: user });
  } catch (error) {
    console.error("updating bounty error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// GET BOUNTY

exports.getBounty = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ "User.bounty._id": id });
    if (!user) {
      return res.status(401).json({ error: "User not exists" });
    }
    const bounty = user.bounty.find((a) => a._id === id);
    res.json({ bounty: bounty });
  } catch (error) {
    console.error("fetching bounty error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// GET ALL CLIENT BOUNTIES

exports.getBountyPerClient = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await User.findOne({
      "User.walletAddress": walletAddress.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ error: "User not exists" });
    }
    res.json({ bounty: user.bounty });
  } catch (error) {
    console.error("fetching all bounty error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// GET ALL BOUNTIES

exports.getAllBounties = async (req, res) => {
  try {
    const users = await User.find();
    let allBounties = [];
    users.forEach((user) => {
      if (user.bounty) {
        allBounties = allBounties.concat(user.bounty);
      }
    });
    res.json({ bounties: allBounties });
  } catch (error) {
    console.error("Fetching all bounty error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// MAKE SUBMISSION

exports.makeSubmission = async (req, res) => {
  try {
    const { id, walletAddress, link, network, comment } = req.body;

    // Find user and client
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const client = await User.findOne({ "bounty._id": id });
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Find the bounty
    const bounty = client.bounty.find((a) => a["_id"].toString() === id);

    // Create a new submission
    const newSubmission = {
      author: user.serviceProvider.name,
      walletAddress: user.walletAddress,
      submissionDate: new Date(),
      profileImage: user.serviceProvider.ImageURL,
      link,
      comment,
      network,
    };
    bounty.submission.push(newSubmission);
    await client.save();
    res.json({ bounty });
  } catch (error) {
    console.error("Error making submission:", error);
    res
      .status(500)
      .json({ error: "An error occurred while making the submission" });
  }
};

// APPROVE SUBMISSION
exports.approveSubmission = async (req, res) => {
  try {
    const { id, submissionId, walletAddress, hash } = req.body;
    const client = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (!client) {
      return res.status(401).json({ error: "User not exists" });
    }

    let bounty = client.bounty.find((a) => a["_id"].toString() === id);

    if (!bounty) {
      return res.status(404).json({ error: "Bounty not found" });
    }

    let submission = bounty.submission.find(
      (a) => a["_id"].toString() === submissionId
    );

    if (!submission) {
      return res.status(406).json({ error: "Submission not found" });
    }

    // Create properties if they don't exist
    if (!bounty.hasOwnProperty("awarded")) {
      bounty.awarded = null; // or any default value
    }

    if (!bounty.hasOwnProperty("awardedAddress")) {
      bounty.awardedAddress = null; // or any default value
    }

    if (!bounty.hasOwnProperty("badgeHash")) {
      bounty.badgeHash = null; // or any default value
    }

    // Update bounty properties
    bounty.awarded = submissionId;
    bounty.badgeHash = hash;
    bounty.awardedAddress = submission.walletAddress;

    await client.save();
    res.json({ bounty });
  } catch (error) {
    console.error("Error approving submission:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// ADD HANDSHAKE

exports.giveHandshake = async (req, res) => {
  try {
    const { id, walletAddress } = req.body;
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    const secondUser = await User.findOne({ _id: id });
    if (!user || !secondUser) {
      return res.status(401).json({ error: "User not exists" });
    }
    const newHandshake = {
      id,
      name: secondUser.client.companyName || secondUser.serviceProvider.name,
      image: secondUser.client.logo || secondUser.serviceProvider.ImageURL,
      date: new Date(),
    };
    user.serviceProvider.handshakes.push(newHandshake);
    await user.save();
    res.json({ user: user });
  } catch (error) {
    console.error("giving handshake error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// SAVE IMAGE TO NFT STORAGE
exports.saveImage = async (req, res) => {
  const { image } = req.body;
  try {
    const cid = await uploadToNFTStorage(image);
    res.send({ url: cid });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).send("Internal server error");
  }
};

// SEND GLMR
exports.sendGLMR = async (req, res) => {
  const { senderAddress, receiverAddress, privateKey, amount } = req.body;

  try {
    const result = await sendCrypto(
      senderAddress,
      receiverAddress,
      privateKey,
      amount
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending glmr." });
  }
};

// SEND BTC FUNCTION

async function sendCrypto(senderAddress, receiverAddress, privateKey, amount) {
  return new Promise(async (resolve, reject) => {
    try {
      let web3 = new Web3(rpc);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");
      const sendTx = {
        from: senderAddress,
        to: receiverAddress,
        value: web3.utils.toWei(amount.toString(), "ether"),
        gasPrice: gasPrice,
        nonce: nonce,
      };

      const signedSendTx = await web3.eth.accounts.signTransaction(
        sendTx,
        privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedSendTx.rawTransaction
      );

      resolve({
        transactionHash: receipt.transactionHash,
        message: "GLMR Sending successful.",
      });
    } catch (error) {
      reject(error);
    }
  });
}

// EMOTE TOKEN
exports.emoteToken = async (req, res) => {
  const { senderAddress, privateKey, tokenId } = req.body;

  try {
    const result = await emoteNFT(senderAddress, privateKey, tokenId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error minting token." });
  }
};
// EMOTE NFT
async function emoteNFT(senderAddress, privateKey, tokenId) {
  return new Promise(async (resolve, reject) => {
    try {
      let web3 = new Web3(rpc);
      const router = new web3.eth.Contract(abi, address);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");

      const mintData = router.methods
        .emote(
          address,
          tokenId,
          "https://ipfs.io/ipfs/QmQPRvg9FYnE3bvs3u1PLKZ2AsnNEpXjGJcTyaR8wzxKmD/",
          true
        )
        .encodeABI();
      const swapTx = {
        from: senderAddress,
        to: address,
        gasPrice: gasPrice,
        nonce: nonce,
        data: mintData,
      };

      const signedSwapTx = await web3.eth.accounts.signTransaction(
        swapTx,
        privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedSwapTx.rawTransaction
      );

      resolve({
        transactionHash: receipt.transactionHash,
        message: "NFT Handshake successful.",
      });
    } catch (error) {
      reject(error);
    }
  });
}

// MINT TOKEN
exports.mintToken = async (req, res) => {
  const { senderAddress, privateKey, URI, tokenId } = req.body;

  try {
    const result = await mintNFT(senderAddress, privateKey, URI, tokenId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error minting token." });
  }
};

async function mintNFT(senderAddress, privateKey, URI, tokenId) {
  return new Promise(async (resolve, reject) => {
    try {
      let web3 = new Web3(rpc);
      const router = new web3.eth.Contract(abi, address);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");

      const mintData = router.methods
        .mint(senderAddress, tokenId, URI)
        .encodeABI();
      const swapTx = {
        from: senderAddress,
        to: address,
        gasPrice: gasPrice,
        nonce: nonce,
        data: mintData,
      };

      const signedSwapTx = await web3.eth.accounts.signTransaction(
        swapTx,
        privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedSwapTx.rawTransaction
      );

      resolve({
        transactionHash: receipt.transactionHash,
        message: "NFT Minting successful.",
      });
    } catch (error) {
      reject(error);
    }
  });
}

// MINT BADGE
exports.mintBadge = async (req, res) => {
  const { senderAddress, privateKey, URI, tokenId, receiverAddress } = req.body;

  try {
    const result = await mintBadge(
      senderAddress,
      privateKey,
      URI,
      tokenId,
      receiverAddress
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error minting token." });
  }
};

async function mintBadge(
  senderAddress,
  privateKey,
  URI,
  tokenId,
  receiverAddress
) {
  return new Promise(async (resolve, reject) => {
    try {
      let web3 = new Web3(rpc);
      const router = new web3.eth.Contract(abi, address);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");

      const mintData = router.methods
        .mint(receiverAddress, tokenId, URI)
        .encodeABI();
      const swapTx = {
        from: senderAddress,
        to: address,
        gasPrice: gasPrice,
        nonce: nonce,
        data: mintData,
      };

      const signedSwapTx = await web3.eth.accounts.signTransaction(
        swapTx,
        privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedSwapTx.rawTransaction
      );

      resolve({
        transactionHash: receipt.transactionHash,
        message: "NFT Minting successful.",
      });
    } catch (error) {
      reject(error);
    }
  });
}

// UPDATE TOKEN
exports.updateToken = async (req, res) => {
  try {
    const token = await Token.findOne();
    token.tokenIds++;
    await token.save();
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during adding tokens:", error);
    res
      .status(500)
      .json({ error: "An error occurred during Logadding tokensin" });
  }
};

// CREATE TOKEN
exports.createToken = async (req, res) => {
  const { tokenIds } = req.body;
  try {
    const token = new Token({
      tokenIds: tokenIds,
    });
    await token.save();
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during creating tokens:", error);
    res
      .status(500)
      .json({ error: "An error occurred during Logadding tokensin" });
  }
};

// GET TOKEN
exports.getToken = async (req, res) => {
  try {
    const token = await Token.findOne();
    res.status(201).json({ tokenIds: token.tokenIds });
  } catch (error) {
    console.error("Error fetching  tokens:", error);
    res.status(500).json({ error: "An error occurred during fetching" });
  }
};

// PROFILE MINTED
exports.profileMinted = async (req, res) => {
  const { walletAddress, id } = req.body;
  try {
    const user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.serviceProvider.isMinted = true;
    user.serviceProvider.mintId = id;
    await user.save();
  } catch (error) {
    console.error("Error saving mint info :", error);
    res.status(500).json({ error: "An error occurred during fetching" });
  }
};

// GET ASTR BALANCE
exports.getASTRBalance = async (req, res) => {
  const { walletAddress } = req.body;
  let web3 = new Web3(rpc);
  const contractABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenOwner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contract = new web3.eth.Contract(
    contractABI,
    "0xFfFFFfffA893AD19e540E172C10d78D4d479B5Cf"
  );
  try {
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const balanceBigInt = BigInt(balance);
    const formattedAmount = (Number(balanceBigInt) / 1e18).toString();
    const resolvedBalance = parseFloat(formattedAmount).toFixed(5);
    res.json({ resolvedBalance: resolvedBalance });
  } catch (error) {
    res.status(500).json({ error: "Error fetching balance", error });
  }
};

// SEND TOKEN
exports.sendASTR = async (req, res) => {
  const { privateKey, senderAddress, receiverAddress, amount } = req.body;

  let Web3js = new Web3(rpc);
  const contract = new Web3js.eth.Contract(
    contractABI,
    "0xFfFFFfffA893AD19e540E172C10d78D4d479B5Cf"
  );
  const gasPriceGwei = 300;
  const gasPriceWei = Web3js.utils.toWei(gasPriceGwei.toString(), "gwei");
  const balance = await contract.methods.balanceOf(senderAddress).call();
  const decimals = await contract.methods.decimals().call();
  const balanceBigInt = BigInt(balance);
  const tokenAmount = amount * 1e18;
  const resolvedBalance = balanceBigInt / BigInt(10) ** BigInt(decimals);

  const data = contract.methods
    .transfer(receiverAddress, tokenAmount)
    .encodeABI();

  try {
    const senderBalance = await Web3js.eth.getBalance(senderAddress);
    if (senderBalance < gasPriceWei) {
      return res
        .status(400)
        .json({ error: "Insufficient GLMR balance for gas fees" });
    }

    const txObj = {
      gasPrice: gasPriceWei,
      to: "0xFfFFFfffA893AD19e540E172C10d78D4d479B5Cf",
      value: "0x00",
      data: data,
      from: senderAddress,
    };

    const signedTx = await Web3js.eth.accounts.signTransaction(
      txObj,
      privateKey
    );
    Web3js.eth.sendSignedTransaction(signedTx.rawTransaction);
    let reponseObject = {
      transactionHash: signedTx.transactionHash,
    };

    res.status(200).json({
      reponseObject,
      message: "Transaction successful",
    });
    console.log(`Transaction success`);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// SEND ASTR XCM
exports.sendASTRxcm = async (req, res) => {
  const { privateKey, receiverAddress, amount } = req.body;
  try {
    const account = privateKeyToAccount(privateKey);
    const evmSigner = createWalletClient({
      account,
      chain: moonbeams,
      transport: http(),
    });
    const e2 = evmToAddress(receiverAddress);
    const data = await Sdk()
      .assets()
      .asset(astr)
      .source(moonbeam)
      .destination(astar)
      .accounts(evmSigner.account.address, e2, {
        evmSigner,
      });
    const hash = await data.transfer(amount);
    console.log(`${data.source.chain.name} tx hash: ${hash}`);
    let reponseObject = {
      transactionHash: hash,
    };
    res.status(200).json({
      reponseObject,
      message: "Transaction successful XCM",
    });
    console.log(`Transaction success`);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
