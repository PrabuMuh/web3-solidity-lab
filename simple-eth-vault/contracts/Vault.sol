// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Vault {
    address public owner;

    // save eth balance for each user
    mapping(address => uint256) private balances;

    // event for logging deposits and withdrawals
    event Deposited(address indexed user, uint256 amoount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // function to deposit eth into the vault
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // function to read balance (read only)
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    // function to withdraw eth from the vault
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdraw amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");      
        require(success, "Transfer failed");
        emit Withdrawn(msg.sender, amount);
    }
    // function to check the total balance of the vault (for testing purposes)
    function getBalanceContract() external view returns (uint256) {
        return address(this).balance;
    }
}
