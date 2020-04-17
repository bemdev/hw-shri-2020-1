const notifyAgent = (port, host, agents) => {
    const newAgent = {
        agentNumber: agents.length + 1,
        agentActive: true,
        port: port,
        host: host,
    };

    agents.push(newAgent);
    console.log(`New agent-${newAgent.agentNumber} connected`);

    return agents;
};

const notifyBuildResult = (req, res) => {
    const { buildId, buildStatus, buildLog } = req.body;
    res.send('build really done ?');
};

module.exports = {
    notifyAgent: notifyAgent,
    notifyBuildResult: notifyBuildResult,
};
