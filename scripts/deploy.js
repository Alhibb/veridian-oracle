const hre = require("hardhat");

async function main() {
  const VeridianOracle = await hre.ethers.getContractFactory("VeridianOracle");
  const veridianOracle = await VeridianOracle.deploy();
  await veridianOracle.deployed();

  console.log(`VeridianOracle contract deployed to address: ${veridianOracle.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});