import { network } from "hardhat";

const { ethers, networkName } = await network.connect();

console.log(`Deploying Counter to ${networkName}...`);

const myToken = await ethers.deployContract("MyToken",[
    "SoftUbiToken",
    "SUT",
    ethers.parseEther("25")

]);

console.log("MyToken address:", await myToken.getAddress());
const [owner,user] = await ethers.getSigners()
console.log(owner.address);
console.log(user.address)

console.log("Waiting for the deployment tx to confirm");
await myToken.waitForDeployment();

console.log("Total Supply:", await myToken.totalSupply());


console.log("Deployment successful!");