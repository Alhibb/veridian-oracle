// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VeridianOracle is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct ESGScores {
        uint8 environmental;
        uint8 social;
        uint8 governance;
        uint8 finalScore;
    }

    mapping(string => ESGScores) public projectScores;
    mapping(string => uint256) public projectCertificateId;

    event CertificateIssued(string indexed projectAccountId, uint256 tokenId, uint8 finalScore);

    constructor() ERC721("Veridian ESG Certificate", "VESG") {}

    function _calculateFinalScore(uint8 env, uint8 soc, uint8 gov) internal pure returns (uint8) {
        return (env * 40 + soc * 30 + gov * 30) / 100;
    }

    function issueCertificate(
        address recipient,
        string memory projectAccountId,
        uint8 environmentalScore,
        uint8 socialScore,
        uint8 governanceScore,
        string memory tokenURI
    ) public onlyOwner {
        require(projectCertificateId[projectAccountId] == 0, "Certificate already issued");

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        uint8 finalScore = _calculateFinalScore(environmentalScore, socialScore, governanceScore);

        projectScores[projectAccountId] = ESGScores(environmentalScore, socialScore, governanceScore, finalScore);
        projectCertificateId[projectAccountId] = tokenId;

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit CertificateIssued(projectAccountId, tokenId, finalScore);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}