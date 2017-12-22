# Akyuu-bin

CLI tool for Akyuu.js.

# Install

```
# npm install akyuu-bin
# or
# yarn add akyuu-bin
```

# Feature

* [ ] Init project
* [x] One step to start/stop Application (akyuu-bin start/stop)
* [x] Check out application status (akyuu-bin status)
* And More...

# Command

## Init

> Work in Progress

## Start/Stop

1. Add `cluster` config

```
{
  cluster: {
    // ... extends akyuu-cluster config

    // mode: 'cluster' | 'fork', default: 'cluster'
    mode: 'cluster',
    // pid file, default: project-root/run/process.pid
    pid: 'pid file',
    // master log
    log: {
      info: 'info log path',
      error: 'error log path'
    }
  }
}
```

2. Add start/stop scripts

```
// package.json
{
  ...
  scripts: {
    "start": "akyuu-bin start",
    "stop": "akyuu-bin stop"
  }
  ...
}
```

3. Type your script to start/stop

# Thanks
