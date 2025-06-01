---
title: "Application Config"
sidebar_position: 6
sidebar_label: "Config"
---

## Overview

Application Config uses [TOML](https://toml.io) file format

Location:
- Windows:  `C:\Users\Username\AppData\Roaming\Gauntlet\config\config.toml`
- Linux: `$HOME/.config/gauntlet/config.toml` or `$XDG_CONFIG_HOME/gauntlet/config.toml`
- macOS: `$HOME/Library/Application Support/dev.project-gauntlet.gauntlet/config.toml`

### `main_window.close_on_unfocus`

Whether main window is closed when it receives unfocus event

| Type   | Default |
|--------|---------|
| `bool` | `true`  |
