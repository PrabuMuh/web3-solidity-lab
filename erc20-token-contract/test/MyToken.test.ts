import { expect } from "chai";
import { parseEther } from "ethers";
import hre from "hardhat";
import { parse } from "path";

const { ethers, networkHelpers } = await hre.network.connect();

describe("MyToken", function () {
  // Deployment test case
  it("should assign initial supply to owner", async function () {
    const [owner] = await ethers.getSigners();

    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000"),
    ]);

    expect(await token.totalSupply()).to.equal(ethers.parseEther("1000"));
    expect(await token.balances(owner.address)).to.equal(
      ethers.parseEther("1000"),
    );
  });

  // Mint test case
  it("should transfer mint to owner successfully", async function () {
    const [owner, user] = await ethers.getSigners();

    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000"),
    ]);
    await token.mint(user.address, ethers.parseEther("500"));
    expect(await token.totalSupply()).to.equal(ethers.parseEther("1500"));
    expect(await token.balances(user.address)).to.equal(
      ethers.parseEther("500"),
    );
  });

  // Burn test case
  it("should burn tokens from owner successfully", async function () {
    const [owner] = await ethers.getSigners();
    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000"),
    ]);
    await token.burn(ethers.parseEther("200"));
    expect(await token.totalSupply()).to.equal(ethers.parseEther("800"));
  });

  // transfer test case
  it("should transfer tokens from owner to recipient successfully", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000"),
    ]);
    await token.transfer(recipient.address, ethers.parseEther("400"));
    expect(await token.balances(owner.address)).to.equal(
      ethers.parseEther("600"),
    );
    expect(await token.balances(recipient.address)).to.equal(
      ethers.parseEther("400"),
    );
  });

  // approve test case
  it("should approve tokens for spender successfully", async function () {
    const [owner, spender] = await ethers.getSigners();
    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000"),
    ]);
    await token.approve(spender.address, ethers.parseEther("100"));
    expect(await token.allowance(owner.address, spender.address)).to.equal(
      ethers.parseEther("100"),
    );
  });

  // transferFrom test case
  it("should transfer tokens from sender to recipient using allowance successfully", async function () {
    const [owner, sender, recipient] = await ethers.getSigners();
    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000"),
    ]);
    await token
      .connect(owner)
      .approve(sender.address, ethers.parseEther("500"));
    await token
      .connect(sender)
      .transferFrom(owner.address, recipient.address, ethers.parseEther("300"));
    expect(await token.balances(owner.address)).to.equal(
      ethers.parseEther("700"),
    );
    expect(await token.balances(recipient.address)).to.equal(
      ethers.parseEther("300"),
    );
  });

  // increaseAllowance test case
  it("should increase allowance for spender successfully", async function () {
    const [owner, spender] = await ethers.getSigners();
    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000")
    ]);
    await token.connect(owner).approve(spender.address, ethers.parseEther("100"));    
    expect(await token.allowance(owner.address, spender.address)).to.equal(ethers.parseEther("100"));
    await token.connect(owner).increaseAllowance(spender.address, ethers.parseEther("50"));
    expect(await token.allowance(owner.address, spender.address)).to.equal(ethers.parseEther("150"));
  })
  
  // decreaseAllowance test case
  it("should decrease allowance for spender successfully", async function(){
    const [owner, spender] = await ethers.getSigners();
    const token = await ethers.deployContract("MyToken", [
      "MyToken",
      "MTK",
      ethers.parseEther("1000")
    ]);
    await token.connect(owner).approve(spender.address, ethers.parseEther("100"));
    expect(await token.allowance(owner.address, spender.address)).to.equal(ethers.parseEther("100"));
    await token.connect(owner).decreaseAllowance(spender.address, ethers.parseEther("30"));
    expect(await token.allowance(owner.address, spender.address)).to.equal(ethers.parseEther("70"));
    await expect(token.connect(owner).decreaseAllowance(spender.address, ethers.parseEther("80"))).to.be.revertedWith("decrease allowance below zero");
  });

});
