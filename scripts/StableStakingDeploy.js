const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //const WETH = await ethers.getContractFactory("WEVMOS");
  //const weth = await WETH.deploy();
  // USDC - 0x0F442e514A3F96bb260e719A88523B082eB7498c
  // rinkeby - StableStaking address: 0x7eAEe9e18bf90e2C48BF5DaD0AA303d1eed6f2bc

  const Staking = await ethers.getContractFactory("StableCronusStaking");
  const staking = await Staking.deploy('0x2b60d7059A177348312d8aF0ec7C4a41EF26119D', '0x8Ce12Cb0CBAE2463b7f0f659449E2fD4988dB5B1', deployer.address, '30000000000000000');

  /*
        IERC20 _rewardToken,
        IERC20 _crn,
        address _feeCollector,
        uint256 _depositFeePercent
  */

  console.log("StableStaking address:", staking.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });