"use strict";

const fs = require("fs-extra");
const path = require("path");
const defaultsDeep = require("lodash.defaultsdeep");

const defaultConfig = {
    mode: "cluster",
    log: {
        info: "",
        error: ""
    },
    pid: path.join(".", "run", "master.pid"),
    entry: ""
};

// Process Manager Config
// use config/default/cluster.js config
class PMConfig {
    /**
     * @param {*} root Project root
     */
    constructor(root) {
        // Because Akyuu.js don't have independent package to handle config
        // So I have to assume all project sturcture is
        // root
        // -- config
        // -- -- default
        // -- -- -- cluster.js
        // -- controllers
        // -- models
        // Hard coded to get cluster config
        const configPath = path.join(root, "config", "default", "cluster.js");
        this.root = root;

        if(fs.pathExistsSync(configPath)) {
            const config = require(configPath);
            defaultsDeep(this, config, defaultConfig);
        } else {
            // TODO
            console.warn("No cluster config found");
            process.exit(1);
        }

        this.entry = this._joinPath(this.entry || "");
        this.log.info = this._joinPath(this.log.info);
        this.log.error = this._joinPath(this.log.error);
        this.pid = this._joinPath(this.pid);
    }

    // convert to absolute path
    _joinPath(p) {
        if(path.isAbsolute(p)) {
            return p;
        }
        return path.join(this.root, p);
    }
}

module.exports = PMConfig;
