"use strict";

const fs = require("fs-extra");
const ora = require("ora");
const PMConfig = require("./config");
const isRunning = require("is-running");

module.exports = function() {
    const spinner = ora("Checking").start();
    const root = process.cwd();
    const config = new PMConfig(root);
    const pidFile = config.pid;

    if(fs.pathExistsSync(pidFile)) {
        const pid = parseInt(fs.readFileSync(pidFile, { encode: "utf8" }));
        if(isRunning) {
            spinner.succeed(`[${pid}] process is running`);
        } else {
            spinner.info(`[${pid}] process is stopped`);
        }
    } else {
        spinner.fail(`No pid file found: ${pidFile}`);
    }
};
