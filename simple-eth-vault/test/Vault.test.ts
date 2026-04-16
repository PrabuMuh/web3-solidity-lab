import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Vault Contract", function () {
  let vault: any;
  let owner: any;
  let user1: any;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    vault = await ethers.deployContract("Vault");
  });

  // test case to check if the owner of the vault is set correctly
  it("should be owner", async function () {
    expect(await vault.owner()).to.equal(owner.address);
  });

  // test case to check if users can deposit ETH into the vault
  it("should allow users to deposit ETH", async function () {
    await vault.connect(user1).deposit({ value: ethers.parseEther("1") });
    expect(await vault.getBalance(user1.address)).to.equal(
      ethers.parseEther("1"),
    );
  });

  // test caase to check if users can withdraw ETH from the vault
  it("should allow users to withdraw ETH", async function () {
    await vault.connect(user1).deposit({ value: ethers.parseEther("3") });
    await vault.connect(user1).withdraw(ethers.parseEther("2"));
    expect(await vault.getBalance(user1.address)).to.equal(
      ethers.parseEther("1"),
    );
  });

  // use case to check contract eth balance after deposit
  it("should update contract balance after deposit", async function () {
    await vault.connect(user1).deposit({ value: ethers.parseEther("2") });
    // fungsi ether.provider.getBalance() digunakan untuk mendapatkan saldo ETH dari sebuah alamat,
    //  dalam hal ini adalah alamat kontrak kodenya vault.target
    const contractBalance = await ethers.provider.getBalance(vault.target);
    expect(contractBalance).to.equal(ethers.parseEther("2"));
  });
});
