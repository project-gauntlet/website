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

Whether main window is closed when it receives unfocus event. Useful for tiling window managers

**Type**: `bool`<br>
**Default**: `true`

### `wayland.main_window_surface`

Allows to specify which API will be used to display, position and order main window. Doesn't have effect on non-Wayland environments

**Type**: `enum`<br>
**Default**: `"prefer_wlr_layer_shell"`

| Value                      | Description                                                                                                                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `"wlr_layer_shell"`        | Use [layer shell protocol](https://wayland.app/protocols/wlr-layer-shell-unstable-v1)                                                                                                                                   |
| `"xdg_shell"`              | Use regular window, useful for cases where layer shell protocol is not supported. May result in incorrect window sizing, positioning and/or ordering of the window depending on window manager/desktop environment used | 
| `"prefer_wlr_layer_shell"` | Use `wlr_layer_shell`, but fall back to `xdg_shell` if layer shell protocol is not supported                                                                                                                            |


### `wayland.global_shortcuts_api`

Allows to specify which API (if any) will be used to register global shortcuts. Doesn't have effect on non-Wayland environments

**Type**: `enum`<br>
**Default**: `"none"`

| Value              | Description                                                                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `"none"`           | Disable global shortcut functionality. User should instead use CLI commands instead and register them in windows manager/desktop environment specific way       |
| `"legacy_x11_api"` | Should be used if your windows manager/desktop environment supports legacy X11 api for global shortcuts. Notably KDE's "Legacy X11 App Support" settings option | 
