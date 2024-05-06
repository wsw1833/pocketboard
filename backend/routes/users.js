const express = require("express");
const router = express.Router();
const {
  buildXcmTransferData,
  createBounty,
  createProfileClient,
  createProfileService,
  getBounty,
  getBountyPerClient,
  getAllBounties,
  makeSubmission,
  approveSubmission,
  giveHandshake,
  getProfile,
  signup,
  createPhrase,
  createWallet,
  getBalance,
  saveImage,
  createToken,
  getToken,
  updateToken,
  sendGLMR,
  mintToken,
  emoteToken,
  profileMinted,
  mintBadge,
  sendASTR,
  getASTRBalance,
  sendASTRxcm,
} = require("../controllers/user");

router.post("/createBounty", createBounty);
router.post("/signup", signup);
router.post("/createProfileClient", createProfileClient);
router.post("/createProfileService", createProfileService);
router.post("/getBounty", getBounty);
router.post("/getBountyPerClient", getBountyPerClient);
router.post("/getAllBounties", getAllBounties);
router.post("/makeSubmission", makeSubmission);
router.post("/approveSubmission", approveSubmission);
router.post("/giveHandshake", giveHandshake);
router.post("/getProfile", getProfile);
router.post("/createPhrase", createPhrase);
router.post("/createWallet", createWallet);
router.post("/getBalance", getBalance);
router.post("/saveImage", saveImage);
router.post("/createToken", createToken);
router.post("/getToken", getToken);
router.post("/updateToken", updateToken);
router.post("/sendGLMR", sendGLMR);
router.post("/mintToken", mintToken);
router.post("/mintBadge", mintBadge);
router.post("/emoteToken", emoteToken);
router.post("/profileMinted", profileMinted);
router.post("/sendASTR", sendASTR);
router.post("/getASTRBalance", getASTRBalance);
router.post("/sendASTRxcm", sendASTRxcm);

module.exports = router;
