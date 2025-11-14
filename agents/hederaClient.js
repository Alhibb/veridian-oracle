const { Client, AccountId, PrivateKey } = require("@hashgraph/sdk");
require("dotenv").config();

function createClient() {
    const operatorId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);
    return client;
}

module.exports = { createClient };