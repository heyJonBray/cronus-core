const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Multicall = await ethers.getContractFactory("MockERC20");
  const multicall = await Multicall.deploy("dec2", "dec2");

  await multicall.mint("0x9404DD94445a3b2043C9732F54eb78bD8Bc36aD8", "10000000000");

  await multicall.mint("0x84aa038C0c8d5aBf8d23D46bDBa428489669Cf96", "10000000000");

  console.log("Multicall address:", multicall.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });