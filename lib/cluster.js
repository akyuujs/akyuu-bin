"use strict";

const fs = require("fs");
const { Console } = require("console");
const akyuu = require("akyuu");

const config = akyuu.config.cluster;
let { stdout, stderr } = process;

if(config.log.info) {
    stdout = fs.createWriteStream(config.log.info, { flags: "a" });
}

if(config.log.error) {
    stderr = fs.createWriteStream(config.log.error, { flags: "a" });
}

// eslint-disable-next-line
const console = new Console(stdout, stderr);

console.info(`${new Date().toString()} [${process.pid}] Master Started`);

akyuu.startCluster({
    onFork(worker) {
        console.info(`${new Date().toString()} [${worker.process.pid}] Fork Success: ${worker.id}`);
    },
    onDisconnect(worker) {
        console.info(`${new Date().toString()} [${worker.process.pid}] Disconnect: ${worker.id}`);
    },
    onExit(worker, code, signal) {
        console.info(
            `${new Date().toString()} [${worker.process.pid}] Exit: ${worker.id} with code ${code} and ${signal}`
        );
    },
    onUnexpectedExit(worker, code, signal) {
        console.error(
            `${new Date().toString()} [${worker.process.pid}]` +
            ` Unexpected Exit: ${worker.id} with code ${code} and ${signal}`
        );
    },
    onReachReforkLimit() {
        console.warn(`${new Date().toString()} [${process.pid}] Reach Refork Limit`);
    }
});

process.on("uncaughtException", err => {
    console.error(`${new Date().toString()} [${process.pid}] Master Uncaught Exception`);
    console.error(err);
});
