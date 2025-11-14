const axios = require('axios');

async function runGovAgent(client, projectAccountId) {
    console.log(`[GovAgent] Evaluating project: ${projectAccountId}`);
    const mirrorNodeUrl = `https://testnet.mirrornode.hedera.com/api/v1/transactions?account.id=${projectAccountId}&limit=100`;

    try {
        const response = await axios.get(mirrorNodeUrl);
        const transactionCount = response.data.transactions.length;

        const normalizedScore = Math.min(100, transactionCount);

        console.log(`[GovAgent] Found ${transactionCount} transactions. Score: ${normalizedScore}`);

        return {
            type: 'governance',
            score: Math.round(normalizedScore)
        };
    } catch (error) {
        console.error(`[GovAgent] Error fetching transactions for ${projectAccountId}:`, error.message);
        return {
            type: 'governance',
            score: 0
        };
    }
}

module.exports = { runGovAgent };