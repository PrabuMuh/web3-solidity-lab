import { network } from "hardhat";

const { ethers } = await network.connect();

const [signer] = await ethers.getSigners();
console.log(signer.address);
const myToken = await ethers.getContractAt("MyToken","0x5FbDB2315678afecb367f032d93F642f64180aa3", signer);
const myBalance = await myToken.balanceOf(signer.address);
console.log(myBalance.toString());

const tx = await myToken.transfer("0x70997970c51812dc3a010c7d01b50e0d17dc79c8",100);
await tx.wait();
console.log("Transfer completed");
const friendBalance = await myToken.balanceOf("0x70997970c51812dc3a010c7d01b50e0d17dc79c8");

// console.log("data sudah diterima: di adress 0x70997970c51812dc3a010c7d01b50e0d17dc79c8");
console.log(friendBalance.toString());

// kasih izin ke spender untuk mengambil token kita
const approveTx = await myToken.approve("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", 50);
await approveTx.wait();
console.log("Approval completed");

const allowance = await myToken.allowance(signer.address, "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
console.log(allowance.toString());
