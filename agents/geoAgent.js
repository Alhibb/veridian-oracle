async function runGeoAgent(client, projectAccountId) {
    console.log(`[GeoAgent] Evaluating project: ${projectAccountId}`);
    
    const mockDeforestationRate = Math.random() * 7.5; 

    const score = 100 - (mockDeforestationRate * 10);
    const normalizedScore = Math.max(0, score);

    console.log(`[GeoAgent] Simulated deforestation rate: ${mockDeforestationRate.toFixed(2)}%. Score: ${Math.round(normalizedScore)}`);

    return {
        type: 'environmental',
        score: Math.round(normalizedScore)
    };
}

module.exports = { runGeoAgent };