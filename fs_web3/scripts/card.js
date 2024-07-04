const hre = require("hardhat");

async function main() {
  const card = await hre.ethers.deployContract("Card");


  await card.waitForDeployment();

   console.log(
    ` deployed to ${card.target}`
  );
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
