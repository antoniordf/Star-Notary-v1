// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

contract StarNotary {
    string public starName;
    address public starOwner;

    event starClaimed(address owner);

    constructor() {
        starName = "Gita";
    }

    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }
}
