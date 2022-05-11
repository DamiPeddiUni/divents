const VERSION = {
    version: "0.0.1",
    latest_update: "11-05-2022"
};

function getVersion (req, res) {
    res.send(JSON.stringify(VERSION))
}

module.exports = { getVersion }