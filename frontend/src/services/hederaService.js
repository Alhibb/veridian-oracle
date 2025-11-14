import { ethers } from 'ethers';
import VeridianOracleABI from '../contracts/VeridianOracle.json';

const getProvider = () => {
    return new ethers.providers.JsonRpcProvider("https://testnet.hashio.io/api");
};

const getContract = () => {
    const provider = getProvider();
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    if (!contractAddress) {
        throw new Error("Contract address is not set in environment variables.");
    }
    return new ethers.Contract(contractAddress, VeridianOracleABI.abi, provider);
};

export const getProjectScore = async (projectAccountId) => {
    try {
        const contract = getContract();
        const scores = await contract.projectScores(projectAccountId);
        const { environmental, social, governance, finalScore } = scores;

        return {
            environmental: environmental,
            social: social,
            governance: governance,
            finalScore: finalScore
        };
    } catch (error) {
        console.error("Error fetching project score from contract:", error);
        throw error;
    }
};