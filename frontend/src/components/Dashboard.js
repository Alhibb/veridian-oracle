import React, { useState, useEffect } from 'react';
import { getProjectScore } from '../services/hederaService';

function Dashboard({ projectAccountId }) {
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!projectAccountId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const data = await getProjectScore(projectAccountId);
                setScores(data);
            } catch (err) {
                setError('Failed to fetch project data. The certificate may not be minted yet.');
            } finally {
                setLoading(false);
            }
        };

        const interval = setInterval(fetchData, 5000); 
        fetchData();

        return () => clearInterval(interval);
    }, [projectAccountId]);

    if (loading) return <div className="loading">Loading ESG Certificate Data...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!scores || scores.finalScore === 0) return <div>Awaiting certificate for project {projectAccountId}...</div>;

    return (
        <div className="dashboard">
            <h2>ESG Certificate for Project: {projectAccountId}</h2>
            <div className="final-score">
                <p>Final Score</p>
                <span>{scores.finalScore}</span>
            </div>
            <div className="score-breakdown">
                <p>Environmental Score: {scores.environmental}</p>
                <p>Social Score: {scores.social}</p>
                <p>Governance Score: {scores.governance}</p>
            </div>
        </div>
    );
}

export default Dashboard;