import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ProjectSubmit from './components/ProjectSubmit';
import './App.css';

function App() {
  const [projectId, setProjectId] = useState('');

  const handleProjectSubmit = (id) => {
    setProjectId(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Veridian Oracle</h1>
        <p>Autonomous ESG Verification on Hedera</p>
      </header>
      <main>
        <ProjectSubmit onProjectSubmit={handleProjectSubmit} />
        {projectId && <Dashboard projectAccountId={projectId} />}
      </main>
    </div>
  );
}

export default App;