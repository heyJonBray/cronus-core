const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  /*
        CronusToken _crn,
        address _devAddr,
        address _treasuryAddr,
        address _investorAddr,
        uint256 _cronusPerSec,
        uint256 _startTimestamp,
        uint256 _devPercent,
        uint256 _treasuryPercent,
        uint256 _investorPercent
  */

        
    const _CronusToken = await ethers.getContractFactory("CronusToken");
    const CronusToken = await _CronusToken.deploy();

    const _MasterChefCronus = await ethers.getContractFactory("MasterChefCronus");
    const MasterChefCronus = await _MasterChefCronus.deploy(CronusToken.address, deployer.address, deployer.address, deployer.address, 1000000000, 1649773686, 200, 0, 0);

    console.log("MasterChefCronus address:", MasterChefCronus.address);
    console.log("CronusToken address:", CronusToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });