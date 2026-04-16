// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
contract MyToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    uint256 public totalSupply;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowance;

    address public owner;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply ;
        owner = msg.sender;
        balances[owner] = _initialSupply;
        emit Transfer(address(0), owner, _initialSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "you're not owner");
        _;
    }
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "invalid address");
        require(amount > 0, "amount must be greater than zero");
        totalSupply += amount;
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    function burn(uint256 amount) external {
        require(amount > 0, "amount must be greater than zero");
        require(balances[msg.sender] >= amount, "insufficient balance");
        balances[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }

    // fungsi transfer adalah fungsi yang digunakan untuk mentransfer token dari satu alamat ke alamat lain
    function transfer(address to, uint256 amount) external returns (bool) {
        require(to != address(0), "invalid address");
        require(balances[msg.sender] >= amount, "insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);  
        return true;
    }

    /* fungsi approve adalah fungsi yang memberikan sebuah izin kepada spender 
    dari owner nya untuk menghabiskan token milik si owner tersebut*/
    function approve(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "invalid address");
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /* fungsi trasnferFrom adalah fungsi yang digunakan untuk mentrasnfer token dari satu alamat ke alamat lain 
     dengan menggunakan allowance yang sudah disetujui sebelumnya */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool) {
        require(from != address(0), "invalid from address");
        require(to != address(0), "invalid to address");
        require(allowance[from][msg.sender] >= amount, "allowance exceeded");
        require(balances[from] >= amount, "insufficient balance");
        balances[from] -= amount;
        balances[to] += amount;
        allowance[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }

    // fungsi increaseAllowance adalah fungsi yang digunakan untuk menambah allowance yang sudah disetujui sebelumnya
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool) {
        require(spender != address(0), "invalid address");
        allowance[msg.sender][spender] += addedValue;
        emit Approval(msg.sender, spender, allowance[msg.sender][spender]);
        return true;
    }

    // fungsi decreaseAllowance adalah fungsi yang digunakan untuk mengurangi allowance yang sudah disetujui sebelumnya
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool) {
        require(spender != address(0), "invalid address");
        uint256 currentAllowance = allowance[msg.sender][spender];
        require(currentAllowance >= subtractedValue, "decreased allowance below zero");
        allowance[msg.sender][spender] = currentAllowance - subtractedValue;
        emit Approval(msg.sender, spender, allowance[msg.sender][spender]);        
        return true;
    }








}
