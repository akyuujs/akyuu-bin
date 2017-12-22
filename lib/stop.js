"use strict";

const fs = require("fs-extra");
const PMConfig = require("./config");
const isRunning = require("is-running");
const ora = require("ora");

module.exports = function() {
    const spinner = ora("Stop process").start();
    const root = process.cwd();
    const config = new PMConfig(root);

    const pidFile = config.pid;

    if(fs.pathExistsSync(pidFile)) {
        const pid = parseInt(fs.readFileSync(pidFile, { encode: "utf8" }));
        if(isRunning(pid)) {
            process.kill(pid);
            return new Promise((resolve, reject) => {
                let timeer = 0;
                function check() {
                    if(isRunning(pid)) {
                        if(timeer > 25) {
                            reject(new Error());
                            spinner.fail(`[${pid}] cannot stop process, please try again`);
                        } else {
                            // check process status every 200 ms
                            setTimeout(check, 200);
                        }
                    } else {
                        resolve();
                        spinner.succeed(`[${pid}] stop process success`);
                        fs.removeSync(pidFile);
                    }
                    timeer++;
                }
                check();
            });
        } else {
            spinner.info(`[${pid}] process stopped`);
        }
    } else {
        spinner.warn(`no pid found: ${pidFile}`);
    }

    return Promise.resolve();
};
