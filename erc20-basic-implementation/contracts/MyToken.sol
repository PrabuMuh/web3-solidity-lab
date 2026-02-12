// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
contract MyToken {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;

    uint256 public totalSupply;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** decimals;
        balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function balanceOf(address owner) external view returns (uint256) {
        return balances[owner];
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }
    function approve(address spender, uint256 amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function allowance(address owner, address spender) external view returns (uint256){
        return allowances[owner][spender];
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool){
        uint256 currentAllowance = allowances[from][msg.sender];
        require(currentAllowance >= amount, "ERC20 : transfer amount exceeds allowance");
        allowances[from][msg.sender] = currentAllowance - amount;
        _transfer(from, to, amount);    
        return true;

    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: transfer from zero address");
        require(to != address(0), "ERC20: transfer to zero address");
        require(balances[from] >= amount, "ERC20: insufficient balance");

        balances[from] -= amount;
        balances[to] += amount;

        emit Transfer(from, to, amount);
    }

}
