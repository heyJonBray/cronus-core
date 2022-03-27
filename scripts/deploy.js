const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //const WETH = await ethers.getContractFactory("WEVMOS");
  //const weth = await WETH.deploy();

  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();
  
  const LPtoken = await ethers.getContractFactory("CronusERC20");
  const lptoken = await LPtoken.deploy();

  const Factory = await ethers.getContractFactory("CronusFactory");
  const factory = await Factory.deploy(deployer.address);

  const Router = await ethers.getContractFactory("CronusRouter02");
  const router = await Router.deploy(factory.address, "0xc778417E063141139Fce010982780140Aa0cD5Ab");

  console.log("Multicall address:", multicall.address);
  console.log("LPtoken address:", lptoken.address);
  console.log("Factory address:", factory.address);
  console.log("Router address:", router.address);

/*

  const WETH = await ethers.getContractFactory("MockERC20");
  const dai = await WETH.deploy("DAI","DAI");
  const usdc = await WETH.deploy("USDC","USDC");
  const usdt = await WETH.deploy("USDT","USDT");


  //await usdt.mint("0x9404DD94445a3b2043C9732F54eb78bD8Bc36aD8","10000000000000000000000");
  //await usdc.mint("0x9404DD94445a3b2043C9732F54eb78bD8Bc36aD8","10000000000000000000000");
  //await dai.mint("0x9404DD94445a3b2043C9732F54eb78bD8Bc36aD8","10000000000000000000000");

  let testers = [
    '0x998A40AaBd59B9112a924B633B38f30d1E01bbBF',
    '0x7cE1cA3f3B14bE21905636aBc3AE40e8Af469c11',
    '0x683dBa6F397BeE5c1ebe6Cb0796b8a1622B42e8A',
    '0xa4Ae1722A5fB118A09c29704099c56B4ccA1FEfA',
    '0xB951914430524346aA9400dEaB7f2A36cFEA098d',
    '0xFe900B6983E2CE84051986d998c7598A90fd79ae',
    '0x27545eB2be12eAF146CaAB5f2436FC933AfA57a5',
    '0x8325Aff2Ccc014468Cdf20F2538D8534db7a100f',
    "0x84aa038C0c8d5aBf8d23D46bDBa428489669Cf96"
  ];

  let testers2 = [
    "0xeC20c22F133c3dA2e5ED36634c2F20Fd83160f4e",
    "0x5C30c93286c7815F0fc96105F9b248a8F429aafD"
  ];

  for (let i = 0; i < testers.length; i++){
    await usdt.mint(testers[i],"10000000000000000000000");
    await usdc.mint(testers[i],"10000000000000000000000");
    await dai.mint(testers[i],"10000000000000000000000");
  }

  //await weth.mint("0x9404DD94445a3b2043C9732F54eb78bD8Bc36aD8","1000000000000000000000")

  //const balance = await weth.balanceOf("0x9404DD94445a3b2043C9732F54eb78bD8Bc36aD8")
  console.log("dai address:", dai.address);
  console.log("usdc address:", usdc.address);
  console.log("usdt address:", usdt.address);
  //console.log("Balance:", balance);

  */
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });