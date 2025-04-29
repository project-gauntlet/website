---
title: "Troubleshooting"
sidebar_position: 8
sidebar_label: "Troubleshooting"
---


## Crash logs

If application panics, the crash logs are saved at following locations:

- Windows: `{FOLDERID_LocalAppData}\Gauntlet\data\logs\crash.txt`
- macOS: `$HOME/Library/Application Support/dev.project-gauntlet.gauntlet/logs/crash.txt`
- Linux: `$XDG_STATE_HOME/gauntlet/logs/crash.txt` or `$HOME/.local/state/gauntlet/logs/crash.txt`

In Gauntlet each plugin is run in separate plugin runtime process, 
if that process panics the logs will also be saved at that location but with following name: `crash-{plugin-internal-uuid}.txt`

## macOS

### Gauntlet Logs
To see the Gauntlet application logs on macOS do the following:
- Stop any running instance of Gauntlet
- In terminal run: `open -n /Applications/Gauntlet.app --stdout ./gauntlet.log --stderr ./gauntlet.log`
- `gauntlet.log` file in current directory will contain the logs

### Console.app
macOS does a some additional validation on the binary before it is even started,
any errors that occur at this stage should be visible in Console.app

## Linux

### Gauntlet Logs
On Linux on Systemd-based systems Gauntlet is usually started as user service.
To get logs Gauntlet Application logs in this setup run: `journalctl --user -u gauntlet`

