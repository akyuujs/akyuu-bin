"use strict";

const yargs = require("yargs");
const start = require("./start");
const stop = require("./stop");
const restart = require("./restart");
const status = require("./stsuts");

// eslint-disable-next-line
yargs
    .usage("$0 [options] <command>")
    .help("h")
    .alias("h", "help")
    .alias("v", "version")
    .command("start", "Start Akyuu.js Application in Production Mode", () => {
        // EMPTY
    }, argv => {
        start(argv).then(() => {
            process.exit(0);
        }).catch(() => {
            process.exit(1);
        });
    })
    .command("stop", "Stop Akyuu.js Application", () => {
        // EMPTY
    }, stop)
    .command("restart", "Restart Application", () => {
        // EMPTY
    }, restart)
    .command("dev", "Start Akyuu.js Aplication in Development Mode")
    .command("status", "Show Akyuu.js Application Status", () => {
        // EMPTY
    }, status)
    .demandCommand()
    .argv;
