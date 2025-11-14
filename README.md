# Veridian Oracle - Autonomous ESG Verification on Hedera

**Submission for the Hedera Hello Future: Ascension Hackathon 2025**

**GitHub Repository:** [http://github.com/alhibb/veridian-oracle](http://github.com/alhibb/veridian-oracle)

**Live Demo URL:** `https://veridian-oracle.vercel.app` (Example URL)

**Video Pitch URL:** `https://youtu.be/your-demo-video-id` (Example URL)

---

### **Team Members**

*   **Naim Hussain ([@Husteem](https://github.com/Husteem))** - Blockchain Architect
*   **Ibrahim Rabiu ([@alhibb](https://github.com/alhibb))** - Full-Stack Web3 Innovator
*   **Biu Ali Dauda ([@alidauda](https://github.com/alidauda))** - Full-Stack & AI Specialist
*   **Muhammad Hamza ([@Hamza1610](https://github.com/Hamza1610))** - AI & Web3 Trailblazer

---

### **1. Project Overview & Problem Statement**

In the rapidly growing field of sustainable finance, "greenwashing"—the act of making misleading claims about environmental practices—is a significant problem. Investors and consumers lack a reliable, transparent, and unbiased way to verify the ESG (Environmental, Social, and Governance) claims of projects. This opacity erodes trust and misdirects capital away from genuinely impactful initiatives.

**Veridian Oracle** solves this by providing a decentralized, autonomous, and fully auditable ESG verification system built on the Hedera network. We replace subjective manual reporting with objective, data-driven analysis performed by a network of specialized AI agents.

---

### **2. The Solution: How It Works**

Veridian Oracle is a three-part system that leverages the unique strengths of Hedera to create an immutable "chain of evidence" for ESG verification.

1.  **Autonomous AI Agents:** Specialized off-chain agents perform specific analytical tasks:
    *   **Geo-Agent:** Analyzes satellite imagery to verify land-use claims like reforestation.
    *   **Ethos-Agent:** Performs sentiment analysis on news and social media to gauge public perception and social impact.
    *   **Gov-Agent:** Audits on-chain treasury activity on Hedera for governance transparency.

2.  **Immutable Audit Trail (Hedera Consensus Service):** Each agent submits its findings as a signed message to a dedicated Hedera Consensus Service (HCS) topic. This creates a permanent, tamper-proof, and publicly auditable log of all the evidence used in the scoring process.

3.  **On-Chain Certificate (Smart Contract & HTS):** A backend service listens to the HCS topic, aggregates the agent scores, and calls a smart contract. The contract then mints a final, non-fungible token (NFT) on the Hedera Token Service (HTS). This "ESG Certificate" serves as a project's verifiable, on-chain proof of its ESG rating, with metadata linking directly to the HCS audit trail.

---

### **3. Technical Stack & Architecture**

*   **Blockchain:** Hedera (Consensus Service, Token Service, Smart Contracts)
*   **Smart Contracts:** Solidity, Hardhat, OpenZeppelin
*   **AI Agents & Backend:** Node.js, Express.js
*   **AI Libraries:** `sentiment` (for NLP), `axios` (for API calls)
*   **Frontend:** React, Ethers.js, CSS3
*   **Wallet Integration:** HashPack
*   **Deployment:** Vercel (Frontend), Heroku (Backend)

---

### **4. Setup & Installation**

**Prerequisites:**
*   Node.js >= 16.0
*   NPM or Yarn
*   A Hedera Testnet Account
*   HashPack Browser Extension

**Instructions:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/alhibb/veridian-oracle.git
    cd veridian-oracle
    ```

2.  **Install all dependencies:**
    ```bash
    npm install
    cd frontend && npm install && cd ..
    ```

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the root directory. Use `.env.example` as a template.
    *   Add your Hedera Account ID, Private Keys, HCS Topic ID, and any API keys.

4.  **Deploy the Smart Contract:**
    ```bash
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network testnet
    ```
    *   Update the deployed contract address in `frontend/.env.local`.

---

### **5. Running the Project**

1.  **Run the Backend Listener & Agent Trigger:**
    (In the root directory)
    ```bash
    node scripts/backendListener.js
    ```
    *This service will listen for HCS messages and also trigger the agents to run.*

2.  **Run the Frontend Application:**
    (In a new terminal)
    ```bash
    cd frontend
    npm start
    ```
    The application will be available at `http://localhost:3000`.

---

### **6. Hackathon Judging Criteria Alignment**

*   **Innovation:** We present a novel solution that moves ESG verification from a centralized, opaque process to a decentralized, transparent, and automated one. The fusion of AI agents with Hedera's HCS for an immutable audit trail is a unique and powerful application.
*   **Feasibility & Execution:** We have built a functional end-to-end MVP. The system successfully deploys a smart contract, runs autonomous agents that submit data to HCS, and features a dApp that displays the on-chain results. The architecture is robust and designed for scalability.
*   **Integration with Hedera:** Our project is deeply integrated with the Hedera network, utilizing HCS for data integrity, HTS for the final NFT certificate, and Hedera Smart Contracts for the core logic. This is not a project that could exist without Hedera's specific feature set.
*   **Success & Impact:** Veridian Oracle directly enhances the Hedera ecosystem by providing a critical tool for the growing ReFi/DeFi for Good space. It increases trust, attracts impact-oriented projects and investors, and has the potential to drive significant HCS transaction volume.
*   **Pitch & Validation:** Our solution addresses a clear, validated market need for transparent ESG data. The pitch clearly articulates the problem, our innovative solution, and the immense growth potential of bringing trust to the multi-trillion dollar sustainable finance market.