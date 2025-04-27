---
title: "Plugin File Structure"
sidebar_position: 3
sidebar_label: "File Structure"
---

## Overview

Here file structure of a plugin is described

Notable directories and files of a plugin are following:
```
plugin
├── assets
│   └── icon.png
├── src
│   └── entrypoint.tsx
├── dist
├── node_modules
├── gauntlet.toml
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Plugin manifest

`gauntlet.toml` is a plugin manifest.
It is used to describe the plugin, what entrypoints does it have, what preferences, what permissions it requires

See [Plugin Manifest](manifest.md)

## Source Code

All source files go into `src` directory. Currently, only TypeScript language is officially supported, which uses `.ts` or `.tsx` file extensions.
`.tsx` is used everywhere where some kind of UI is being created

## Assets

`assets` directory contains files which will be downloaded together with the plugin itself.
It is optional and is only required if plugin has at least one asset

See [Assets](../api-reference/assets.mdx)

## `dist` directory

`dist` directory contains compiled plugin. It is created when starting dev server or when publishing the plugin

## Dependency management

`node_modules`, `package-lock.json` and `package.json` all belong to Node.js and npm.
Even though Gauntlet uses Deno to run plugins, Node.js is used to run tooling: gather dependencies, run dev server, publish, etc.

## Other

`tsconfig.json` is a configuration file for TypeScript language compiler
