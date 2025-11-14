require("dotenv").config();
const { Client, AccountId, PrivateKey, HcsClient } = require("@hashgraph/sdk");
const { ethers } = require("ethers");
const VeridianOracleABI = require("../artifacts/contracts/VeridianOracle.sol/VeridianOracle.json").abi;
const { runAllAgents } = require('../agents');

const operatorId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY);
const hcsTopicId = process.env.HCS_TOPIC_ID;
const contractId = process.env.CONTRACT_ID;

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

let projectSubmissions = {};

async function issueCertificateOnChain(projectId, scores) {
    const provider = new ethers.providers.JsonRpcProvider("https://testnet.hashio.io/api");
    const signer = new ethers.Wallet(`0x${process.env.OPERATOR_PRIVATE_KEY}`, provider);
    const contract = new ethers.Contract(contractId, VeridianOracleABI, signer);

    console.log(`Issuing certificate for project ${projectId}...`);
    const tokenURI = `https://api.veridianoracle.com/metadata/${projectId}`;
    
    try {
        const tx = await contract.issueCertificate(
            signer.address,
            projectId,
            scores.environmental,
            scores.social,
            scores.governance,
            tokenURI
        );
        await tx.wait();
        console.log(`Certificate minted successfully for project ${projectId}!`);
    } catch (error) {
        console.error("Error minting certificate:", error);
    }
}

function processMessage(message) {
    try {
        const data = JSON.parse(Buffer.from(message).toString('utf-8'));
        const { project, type, score } = data;

        if (!projectSubmissions[project]) {
            projectSubmissions[project] = {};
        }

        projectSubmissions[project][type] = score;
        console.log(`Received score for ${project}: ${type} = ${score}`);

        const currentScores = projectSubmissions[project];
        if (currentScores.environmental && currentScores.social && currentScores.governance) {
            console.log(`All scores received for project ${project}.`);
            issueCertificateOnChain(project, currentScores);
            delete projectSubmissions[project];
        }
    } catch (error) {
        console.error("Error processing HCS message:", error);
    }
}

function main() {
    console.log("Backend listener started. Subscribing to HCS Topic:", hcsTopicId);
    
    new HcsClient()
        .subscribe(hcsTopicId, (message) => {
            processMessage(message.contents);
        })
        .onError((err) => {
            console.error("HCS Subscription Error:", err);
        });

    setInterval(() => {
        console.log("\nTriggering agents for project 0.0.12345...");
        runAllAgents("0.0.12345", "Hedera Impact Fund");
    }, 60000); 
}

main();