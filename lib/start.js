"use strict";

const { spawn } = require("child_process");
const fs = require("fs-extra");
const PMConfig = require("./config");
const path = require("path");
const isRunning = require("is-running");
const ora = require("ora");

module.exports = function() {
    const spinner = ora("Starting process").start();
    const root = process.cwd();
    const config = new PMConfig(root);
    const pidFile = config.pid;

    if(fs.pathExistsSync(pidFile)) {
        const pid = parseInt(fs.readFileSync(pidFile, { encode: "utf-8" }));
        if(pid && isRunning(pid)) {
            spinner.info(`[${pid}] process already is running`);
            process.exit(0);
        }
    }

    const env = Object.create(process.env);
    env.NODE_CONFIG_DIR = path.join(root, "config");

    const child = spawn("node", [ path.join(__dirname, "./cluster.js") ], {
        detached: true,
        env
    });

    let startFailed;
    const promise = new Promise((resolve, reject) => {
        startFailed = reject;
        setTimeout(() => {
            resolve();
        }, 5000);
    });

    child.on("exit", code => {
        startFailed(new Error(`process exit with ${code}`));
    });

    child.on("error", e => {
        startFailed(e);
    });

    // child.stdout.pipe(process.stdout)
    // child.stderr.pipe(process.stderr)

    fs.writeFileSync(pidFile, child.pid);
    spinner.text = `[${child.pid}] process created, wating`;

    return promise.then(() => {
        spinner.succeed(`[${child.pid}] process start success`);
        child.unref();
    }).catch(e => {
        spinner.fail(`[${child.pid}] process start failed`);
        console.error(e);
    });
};
