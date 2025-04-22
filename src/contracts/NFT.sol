// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AINFT is ERC721URIStorage, Ownable {
    using Strings for uint256;
    
    uint256 private _tokenIds;
    mapping(string => bool) private _usedPrompts;
    
    event NFTMinted(address recipient, uint256 tokenId, string tokenURI, string prompt);

    constructor() ERC721("AI Generated NFT", "AINFT") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory tokenURI, string memory prompt)
        public
        returns (uint256)
    {
        require(!_usedPrompts[prompt], "This prompt has already been used");
        
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _usedPrompts[prompt] = true;
        
        emit NFTMinted(recipient, newItemId, tokenURI, prompt);
        return newItemId;
    }

    function isPromptUsed(string memory prompt) public view returns (bool) {
        return _usedPrompts[prompt];
    }
}