// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Zazzle is ERC20{
    constructor(uint256 _supply) ERC20("Zazzle", "ZZL") {
        _mint(msg.sender, _supply * (10 ** decimals( )));
}
uint public data; 
function setData(uint _data) external{
    data = _data;
}
}