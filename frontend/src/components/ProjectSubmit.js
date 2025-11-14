import React, { useState } from 'react';

function ProjectSubmit({ onProjectSubmit }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onProjectSubmit(inputValue.trim());
        }
    };

    return (
        <form className="project-submit" onSubmit={handleSubmit}>
            <label htmlFor="projectId">Enter Project Account ID to Verify</label>
            <div>
                <input
                    id="projectId"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g., 0.0.12345"
                />
                <button type="submit">Get Score</button>
            </div>
        </form>
    );
}

export default ProjectSubmit;