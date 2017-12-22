const start = require("./start");
const stop = require("./stop");

module.exports = function(argv) {
    stop(argv).then(() => {
        start(argv);
    });
};
