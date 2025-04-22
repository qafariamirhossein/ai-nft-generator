// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AINFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(string => bool) private _usedPrompts;

    constructor() ERC721("AI NFT", "AINFT") Ownable(msg.sender) {}

    function mintNFT(address to, string memory tokenURI, string memory prompt)
        public
        returns (uint256)
    {
        require(!_usedPrompts[prompt], "This prompt has already been used");
        _usedPrompts[prompt] = true;

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }

    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
