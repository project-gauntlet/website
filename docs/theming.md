---
title: "Theming"
sidebar_position: 6
sidebar_label: "Theming"
---

Currently, in Gauntlet with themes it is possible to change:
- Colors of text and background
- Window border color, width and radius
- Border radius of components in content

Theming is only affects main window and doesn't affect Settings UI

Theme config file is in [TOML](https://toml.io) format

Theme config file locations:
- Windows:  `C:\Users\Username\AppData\Roaming\Gauntlet\config\theme.toml`
- Linux: `$HOME/.config/gauntlet/theme.toml` or `$XDG_CONFIG_HOME/gauntlet/theme.toml`
- macOS: `$HOME/Library/Application Support/dev.project-gauntlet.gauntlet/theme.toml`

On theme may look slightly different on each system because of OS-provided window decorations

Currently, changes to theme config are only applied after application restart

Any errors in theme config file will be shown in application logs

See bundled themes for examples [here](https://github.com/project-gauntlet/gauntlet/tree/main/bundled_themes)
