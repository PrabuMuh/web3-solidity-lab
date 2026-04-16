import { network } from "hardhat";

const { ethers, networkName } = await network.connect();
const [signer1, signer2,signer3] = await ethers.getSigners();
console.log(`Deploying Counter to ${networkName}...`);
const myToken = await ethers.deployContract("MyToken",[ethers.parseEther("1000")]);

console.log("Waiting for the deployment tx to confirm");
await myToken.waitForDeployment();

// alamat kontrak yang sudah dideploy
console.log("MyToken address:", await myToken.getAddress());

// ? Fungsi Cek Balance Token

// ! cek balance dari akun pertama
const balanceAccount1 = await myToken.balanceOf(signer1.address);
console.log(`Balance akun ke 1: ${balanceAccount1.toString()}`);

// ! cek balance dari akun kedua sebelum transfer
const balanceAccount2Before = await myToken.balanceOf(signer2.address);
console.log(`Balance akun ke 2 sebelum transfer: ${balanceAccount2Before.toString()}`);


// ? Fungsi Transfer Token
// ! transfer token ke akun kedua
const transferToAccount2 = await myToken.connect(signer1).transfer(signer2.address, ethers.parseEther("10"));
await transferToAccount2.wait();
console.log(`Transfer 10 token ke akun ke-2 berhasil`);

// ! cek balance dari akun kedua setelah transfer
const balanceAccount2After = await myToken.balanceOf(signer2.address);
console.log(`Balance akun ke 2 setelah di transfer: ${balanceAccount2After.toString()}`);

// ! cek balance dari akun pertama setelah transfer
const balanceAccount1After = await myToken.balanceOf(signer1.address);
console.log(`Balance akun ke 1 setelah di transfer: ${balanceAccount1After.toString()}`);

// ? Fungsi Approve 
// ! approve akun kedua untuk menggunakan token dari akun pertama
const approveAccoutnt2 = await myToken.connect(signer1).approve(signer2.address, ethers.parseEther("5"));
await approveAccoutnt2.wait();
console.log(`Approve akun ke-2 untuk menggunakan 5 token dari akun ke-1 berhasil`);

// ? fungsi allowance
// cek allowance dari akun kedua untuk menggunakan token dari akun pertama
const allowanceAccount2 = await myToken.allowance(signer1.address, signer2.address);
console.log("nilai dari allowance akun ke 2 untuk menggunakan token dari akun ke 1 yaitu :", allowanceAccount2.toString());

// ? fungsi transferFrom
// ! transfer token dari akun pertama ke akun ke 3 menggunakan akun kedua
const transferFromAccount2ToAccount3 = await myToken.connect(signer2).transferFrom(signer1.address, signer3.address, ethers.parseEther("3"))
await transferFromAccount2ToAccount3.wait();
const balanceAccount3 = await myToken.balanceOf(signer3.address)
console.log("token address ke 3: ", balanceAccount3.toString())

// nilai allowance setelah transferFrom di akun kedua
const allowanceAccount2After = await myToken.allowance(signer1.address, signer2.address);
console.log("nilai dari allowance akun ke 2 untuk menggunakan token dari akun ke 1 setelah transferFrom yaitu :", allowanceAccount2After.toString());