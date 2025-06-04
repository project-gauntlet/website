---
title: "Gauntlet CLI"
sidebar_position: 5
sidebar_label: "CLI"
---

Gauntlet has a simple command line interface

## Commands

### `gauntlet`

Without any arguments calling Gauntlet binary will start the Gauntlet application.
If application is already opened, the window of already opened application will be shown

### `gauntlet --minimized`

By default, starting the application will open the main window. 
`--minimized` flag will start the application without opening the window.
Useful when starting the application automatically on OS startup

### `gauntlet open`

Opens main application window, if application is already running. Can be used instead of global shortcut

### `gauntlet settings`

Opens Gauntlet settings

### `gauntlet run <plugin-id> <entrypoint-id> <action-id>`

Runs commands, opens views, runs specific actions, can be used as a replacement for entrypoint-specific global shortcuts,
e.g. if global shortcuts are not supported on your system

- `<plugin-id>`
  - Plugin ID, same value as the one used during installation
  - Also shown in Settings UI
- `<entrypoint-id>`
  - Entrypoint ID
  - Value can be found in [Plugin Manifest](http://localhost:3000/docs/plugin-development/manifest#entrypointid) 
  - For [generated entrypoints](http://localhost:3000/docs/api-reference/entrypoint-types/entrypoint-generator), value is specified in plugin code
- `<action-id>`
  - Action ID
  - Value can be found in [Plugin Manifest](http://localhost:3000/docs/plugin-development/manifest#entrypointactionsid)
  - Also accepts special values
    - `:primary`: runs [primary action](https://gauntlet.sh/docs/api-reference/actions#overview) of the entrypoint
    - `:secondary`: runs [secondary action](https://gauntlet.sh/docs/api-reference/actions#overview) of the entrypoint

### `gauntlet --version`

Shows Gauntlet version
