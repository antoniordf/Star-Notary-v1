// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

contract StarNotary {
    string public starName;
    address public starOwner;

    event starClaimed(address owner);

    modifier onlyOwner() {
        require(
            msg.sender == starOwner,
            "Only the owner can call this function"
        );
        _;
    }

    constructor() {
        starName = "Gita";
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }

    function changeName(string memory _name) public onlyOwner {
        starName = _name;
    }
}
