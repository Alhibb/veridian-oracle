require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const operatorAccountId = process.env.OPERATOR_ACCOUNT_ID;
const operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY;

if (!operatorPrivateKey || !operatorAccountId) {
  throw new Error("Please set OPERATOR_PRIVATE_KEY and OPERATOR_ACCOUNT_ID in your .env file");
}

module.exports = {
  solidity: "0.8.9",
  networks: {
    testnet: {
      url: "https://testnet.hashio.io/api",
      accounts: [`0x${operatorPrivateKey}`],
    },
  },
};