const { TopicMessageSubmitTransaction } = require("@hashgraph/sdk");
const { createClient } = require("./hederaClient");
const { runEthosAgent } = require("./ethosAgent");
const { runGeoAgent } = require("./geoAgent");
const { runGovAgent } = require("./govAgent");

async function submitToHCS(client, message) {
    const hcsTopicId = process.env.HCS_TOPIC_ID;
    try {
        await new TopicMessageSubmitTransaction({
            topicId: hcsTopicId,
            message: JSON.stringify(message),
        }).execute(client);
        console.log(`[HCS] Submitted score: ${message.type} = ${message.score}`);
    } catch (error) {
        console.error(`[HCS] Failed to submit message for type ${message.type}:`, error);
    }
}

async function runAllAgents(projectAccountId, projectKeywords) {
    const client = createClient();
    console.log(`\n[Agents] Running full evaluation for project: ${projectAccountId}`);

    // Run agents in parallel
    const [ethosResult, geoResult, govResult] = await Promise.all([
        runEthosAgent(client, projectAccountId, projectKeywords),
        runGeoAgent(client, projectAccountId),
        runGovAgent(client, projectAccountId)
    ]);

    const baseMessage = { project: projectAccountId, timestamp: new Date().toISOString() };

    // Submit results to HCS
    await submitToHCS(client, { ...baseMessage, ...ethosResult });
    await submitToHCS(client, { ...baseMessage, ...geoResult });
    await submitToHCS(client, { ...baseMessage, ...govResult });

    console.log(`[Agents] Evaluation complete for ${projectAccountId}.\n`);
}

module.exports = { runAllAgents };