const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  /*
        IERC20[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a, 12000
        uint256 _fee,
        uint256 _adminFee,
        address lpTokenTargetAddress
        [usdt, usdc, dai, ust]
  */

    const _AmplificationUtils = await ethers.getContractFactory("AmplificationUtils");
    const _SwapUtils = await ethers.getContractFactory("SwapUtils");

    const AmplificationUtils = await _AmplificationUtils.deploy();
    const SwapUtils = await _SwapUtils.deploy();

        
    const _StableSwap = await ethers.getContractFactory("StableSwap", {libraries: {
        AmplificationUtils: AmplificationUtils.address,
        SwapUtils: SwapUtils.address
      }});
      
    const StableSwap = await _StableSwap.deploy(
        ['0x2c598B42CB7952E4F906FdEAF74a1Ed4c5966592', '0x2b60d7059A177348312d8aF0ec7C4a41EF26119D', '0x0440d475455436c7B1bf6Ed42E8Fd6299789a65a', '0x9b131b7cC4874843a6d99BF24bBA4d28a540A041'],
        [18, 18, 18, 18],
        'Cronus Stable LP',
        'csLP',
        '12000',
        3**8,
        2**10
    );

    console.log("StableSwap address:", StableSwap.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });