const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const WETH = await ethers.getContractFactory("MockERC20");
  const weth = await WETH.deploy("wrapped evmos", "WEVMOS");

  const LPtoken = await ethers.getContractFactory("CronusERC20");
  const lptoken = await LPtoken.deploy();

  const Factory = await ethers.getContractFactory("CronusFactory");
  const factory = await Factory.deploy(deployer.address);

  const Router = await ethers.getContractFactory("CronusRouter02");
  const router = await Router.deploy(factory.address, weth.address);

  console.log("WEVMOS address:", weth.address);
  console.log("LPtoken address:", lptoken.address);
  console.log("Factory address:", factory.address);
  console.log("Router address:", router.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });