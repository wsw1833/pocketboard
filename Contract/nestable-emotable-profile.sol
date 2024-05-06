// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// ERC-7401 Emotional Token interface
interface IEmotionalToken {
    function setEmotionalState(uint256 tokenId, uint8 emotionalState) external;
    function getEmotionalState(uint256 tokenId) external view returns (uint8);
}

// ERC-7401 Nested Emotional Token interface
interface INestedEmotionalToken {
    function nestEmotionalTokens(uint256 parentId, uint256[] memory nestedIds) external;
    function getNestedEmotionalTokens(uint256 parentId) external view returns (uint256[] memory);
}

// ERC-7409 Emotional Token interface
interface IERC7409 {
    function bulkEmote(address[] memory collections, uint256[] memory tokenIds, string[] memory emojis, bool[] memory states) external;
    function emote(address collection, uint256 tokenId, string memory emoji, bool state) external;
}

// ERC-7409 Metadata Extension interface
interface IEmotionalMetadata {
    function getEmotionalMetadata(uint256 tokenId) external view returns (string memory);
}

// ERC-7401 Nested Protocol interface
interface IERC7401Nested {
    struct Child {
        uint256 childId;
        address owner;
    }

    function acceptChild(uint256 parentId, uint256 childIndex, address childAddress, uint256 childId) external;
    function addChild(uint256 parentId, uint256 childId, bytes calldata data) external;
    function burn(uint256 tokenId, uint256 maxRecursiveBurns) external returns (uint256 burnedChildren);
    function childOf(uint256 parentId, uint256 index) external view returns (Child memory child);    
    function directOwnerOf(uint256 tokenId) external view returns (address owner, uint256 parentId, bool isNFT);
    function nestTransferFrom(address from, address to, uint256 tokenId, uint256 destinationId, bytes calldata data) external;
    function ownerOf(uint256 tokenId) external view returns (address owner_);
    function pendingChildOf(uint256 parentId, uint256 index) external view returns (IERC7401Nested.Child memory child);
    function rejectAllChildren(uint256 parentId, uint256 maxRejections) external;
    function transferChild(uint256 tokenId, address to, uint256 destinationId, uint256 childIndex, address childAddress, uint256 childId, bool isPending, bytes calldata data) external;
    event ChildAccepted(uint256 indexed tokenId, uint256 childIndex, address indexed childAddress, uint256 indexed childId);
    event ChildProposed(uint256 indexed tokenId, uint256 childIndex, address indexed childAddress, uint256 indexed childId);
    event ChildTransferred(uint256 indexed tokenId, uint256 childIndex, address indexed childAddress, uint256 indexed childId, bool fromPending, bool toZero);
    event NestTransfer(address indexed from, address indexed to, uint256 fromTokenId, uint256 toTokenId, uint256 indexed tokenId);
}

contract NestableEmotableNFT is ERC721URIStorage, IEmotionalToken, INestedEmotionalToken, IERC7409, IEmotionalMetadata, IERC7401Nested {
    using Strings for uint256;

    // Struct to represent the NFT
    struct NFT {
        string emotionalMetadata;
        uint8 emotionalState;
        uint256[] nestedNFTIds;
    }

    // Mapping from token ID to NFT
    mapping(uint256 => NFT) public nfts;

    // Event for new NFT creation
    event NFTCreated(uint256 indexed id, string emotionalMetadata, string tokenURI);

    // Counter for NFT IDs
    uint256 private nextNFTId = 1;

    constructor() ERC721("NestableEmotableNFT", "NENFT") {}

    // Function to create a new NFT
    function createNFT(string memory _emotionalMetadata, string memory _tokenURI) public {
        nfts[nextNFTId] = NFT(_emotionalMetadata, 0, new uint256[](0));
        emit NFTCreated(nextNFTId, _emotionalMetadata, _tokenURI);
        _mint(msg.sender, nextNFTId);
        _setTokenURI(nextNFTId, _tokenURI);
        nextNFTId++;
    }

    // ERC-7401: Set emotional state for an NFT
    function setEmotionalState(uint256 tokenId, uint8 emotionalState) external override {
        require(emotionalState <= 100, "Emotional state must be between 0 and 100");
        nfts[tokenId].emotionalState = emotionalState;
    }

    // ERC-7401: Get emotional state of an NFT
    function getEmotionalState(uint256 tokenId) external view override returns (uint8) {
        return nfts[tokenId].emotionalState;
    }

    // ERC-7401: Nest emotional tokens within a parent NFT
    function nestEmotionalTokens(uint256 parentId, uint256[] memory nestedIds) external override {
        for (uint256 i = 0; i < nestedIds.length; i++) {
            require((nestedIds[i]), "Nested NFT does not exist");
            nfts[parentId].nestedNFTIds.push(nestedIds[i]);
        }
    }

    // ERC-7401: Get nested emotional tokens of a parent NFT
    function getNestedEmotionalTokens(uint256 parentId) external view override returns (uint256[] memory) {
        return nfts[parentId].nestedNFTIds;
    }

    // ERC-7409: Emote on an emotional token
    function emote(address collection, uint256 tokenId, string memory emoji, bool state) external override {
        // Implementation to emit an event or perform actions when emote is called
        emit Emoted(msg.sender, collection, tokenId, emoji, state);
    }

    // ERC-7409: Bulk emote on emotional tokens
    function bulkEmote(address[] memory collections, uint256[] memory tokenIds, string[] memory emojis, bool[] memory states) external override {
        // Implementation to perform bulk emote actions
        require(collections.length == tokenIds.length && collections.length == emojis.length && collections.length == states.length, "Input arrays length mismatch");
        for (uint256 i = 0; i < collections.length; i++) {
            emit Emoted(msg.sender, collections[i], tokenIds[i], emojis[i], states[i]);
        }
    }

    // ERC-7409: Get emotional metadata of an emotional token
    function getEmotionalMetadata(uint256 tokenId) external view override returns (string memory) {
        return nfts[tokenId].emotionalMetadata;
    }

    // ERC-7401 Nested Protocol: Accept a child NFT
    function acceptChild(uint256 parentId, uint256 childIndex, address childAddress, uint256 childId) external override {
        require(msg.sender == ownerOf(parentId), "Only the owner of the parent NFT can accept a child");
        require(ownerOf(childId) == address(this), "Child NFT is not owned by this contract");
        require(nfts[parentId].nestedNFTIds[childIndex] == childId, "Child NFT does not match the expected child at the provided index");

        _transfer(address(this), msg.sender, childId);
        emit ChildAccepted(parentId, childIndex, childAddress, childId);
    }

    // ERC-7401 Nested Protocol: Add a child NFT
    function addChild(uint256 parentId, uint256 childId, bytes calldata data) external override {
        require(msg.sender == ownerOf(parentId), "Only the owner of the parent NFT can add a child");
        require(ownerOf(childId) == msg.sender, "Sender is not the owner of the child NFT");

        nfts[parentId].nestedNFTIds.push(childId);
        emit ChildProposed(parentId, nfts[parentId].nestedNFTIds.length - 1, msg.sender, childId);
    }

    // ERC-7401 Nested Protocol: Burn NFTs
    function burn(uint256 tokenId, uint256 maxRecursiveBurns) external override returns (uint256 burnedChildren) {
        require(ownerOf(tokenId) == msg.sender, "Only the owner of the NFT can burn it");
        uint256[] memory nestedIds = nfts[tokenId].nestedNFTIds;
        for (uint256 i = 0; i < nestedIds.length && i < maxRecursiveBurns; i++) {
            if (ownerOf(nestedIds[i]) == address(this)) {
                _burn(nestedIds[i]);
                burnedChildren++;
            }
        }

        _burn(tokenId);
    }

    // ERC-7401 Nested Protocol: Get child NFT details
    function childOf(uint256 parentId, uint256 index) external view override returns (IERC7401Nested.Child memory child) {
        require(ownerOf(parentId) != address(0)), "Parent NFT does not exist");
        require(index < nfts[parentId].nestedNFTIds.length, "Index out of range");

        uint256 childId = nfts[parentId].nestedNFTIds[index];
        return IERC7401Nested.Child(childId, ownerOf(childId));
    }

    // ERC-7401 Nested Protocol: Get direct owner of an NFT
    function directOwnerOf(uint256 tokenId) external view override returns (address owner, uint256 parentId, bool isNFT) {
        address directOwner = ownerOf(tokenId);
        uint256 parent = 0;
        bool isNested = false;

        for (uint256 i = 1; i < nextNFTId; i++) {
            uint256[] memory nestedIds = nfts[i].nestedNFTIds;
            for (uint256 j = 0; j < nestedIds.length; j++) {
                if (nestedIds[j] == tokenId) {
                    parent = i;
                    isNested = true;
                    break;
                }
            }
            if (isNested) break;
        }

        return (directOwner, parent, isNested);
    }

    // ERC-7401 Nested Protocol: Nest transfer NFTs
    function nestTransferFrom(address from, address to, uint256 tokenId, uint256 destinationId, bytes calldata data) external override {
        require(ownerOf(tokenId) == from, "Not the owner of the NFT");
        require(to != address(0), "Transfer to the zero address");
        require(to != address(this), "Transfer to this contract is not allowed");

        _transfer(from, to, tokenId);
        emit NestTransfer(from, to, tokenId, destinationId, tokenId);
    }

    // ERC-7401 Nested Protocol: Get owner of an NFT
    function ownerOf(uint256 tokenId) external view override returns (address owner_) {
        return ERC721.ownerOf(tokenId);
    }

    
    // ERC-7401 Nested Protocol: Supports Interface
    function supportsInterface(bytes4 interfaceId) external view override returns (bool) {
        return interfaceId == type(IERC7401Nested).interfaceId;
    }

    // ERC-7401 Nested Protocol: Event for Nest Transfer
    event NestTransfer(address indexed from, address indexed to, uint256 fromTokenId, uint256 toTokenId, uint256 indexed tokenId);

    // ERC-7409: Event for Emote
    event Emoted(address indexed emoter, address indexed collection, uint256 indexed tokenId, string emoji, bool on);

    // ERC-7409: Placeholder functions
    function bulkPrepareMessagesToPresignEmote(address[] memory collections, uint256[] memory tokenIds, string[] memory emojis, bool[] memory states, uint256[] memory deadlines) external view override returns (bytes32[] memory) {}
    function bulkPresignedEmote(address[] memory emoters, address[] memory collections, uint256[] memory tokenIds, string[] memory emojis, bool[] memory states, uint256[] memory deadlines, uint8[] memory v, bytes32[] memory r, bytes32[] memory s) external override {}
    function emoteCountOf(address collection, uint256 tokenId, string memory emoji) external view override returns (uint256) {}
    function hasEmoterUsedEmote(address emoter, address collection, uint256 tokenId, string memory emoji) external view override returns (bool) {}
    function haveEmotersUsedEmotes(address[] memory emoters, address[] memory collections, uint256[] memory tokenIds, string[] memory emojis) external view override returns (bool[] memory) {}
    function prepareMessageToPresignEmote(address collection, uint256 tokenId, string memory emoji, bool state, uint256 deadline) external view override returns (bytes32) {}
    function presignedEmote(address emoter, address collection, uint256 tokenId, string memory emoji, bool state, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external override {}
}