import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Attacker Contract", function () {
  let vault: any;
  let attacker: any;
  let owner: any;
  let user: any;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    vault = await ethers.deployContract("Vault");
    attacker = await ethers.deployContract("Attacker", [vault.target]);
    await vault.connect(user).deposit({ value: ethers.parseEther("10") });
  });
  // it("should not drain the vault",async function(){
  //     await expect(attacker.attack({value: ethers.parseEther("2")})).to.be.revertedWith("Transfer failed");
  //     const vaultBalance = await ethers.provider.getBalance(vault.target);
  //     expect(vaultBalance).to.equal(ethers.parseEther("5"));
  // })

  // it("should exploit vault (partial drain)", async function () {    

  //   const before = await ethers.provider.getBalance(vault.target);

  //   await attacker.attack({
  //     value: ethers.parseEther("1"),
  //   });    

  //   const after = await ethers.provider.getBalance(vault.target);
  //   const attackerBalance = await ethers.provider.getBalance(attacker.target);
  //   console.log("Before:", before.toString());
  //   console.log("After :", after.toString());
  //   console.log("Attacker Balance:", attackerBalance.toString());
  
    
  // });
});
