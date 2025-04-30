---
title: "Architecture"
sidebar_position: 2
sidebar_label: "Architecture"
---

## Overview

The application consists of 4 modules: server, frontend, plugin runtime and settings.

### Plugin Runtime
Gauntlet plugins are written in TypeScript.
As JavaScript runtime [Deno](https://deno.com) is used.
Each plugin runtime runs in a separate Deno Worker in a separate OS process and communicates with server using inter-process communication.
Deno Workers are sandboxed using [Deno's permission model](https://docs.deno.com/runtime/fundamentals/security).
Each plugin must define permissions in [Plugin Manifest](../plugin-development/manifest#permissions) what external resources it needs:
filesystem, network, environment variables or subprocess execution, some Gauntlet-specific permissions, etc.

Plugins can use [React](https://github.com/facebook/react) to create UI that will be rendered by frontend.
This is implemented using custom React Reconciler (similar to React Native).

The Deno runtime is kept alive by the always running event loop that handles incoming events from frontend/server

Plugins are distributed inside the same Git repository which contains the plugin code.
There is no central distribution system currently.
Plugins are installed using the Git repository URL


:::warning

Due to limited resources, security measures for Gauntlet application are implemented on a best-effort basis and are not guaranteed

:::

### Frontend

As GUI framework [iced-rs](https://github.com/iced-rs/iced) is used. 
Frontend runs inside the same OS process as server. 

### Server

The server is fairly straightforward [Tokio](https://tokio.rs/) runtime.
All requests or events from frontend to plugin runtime and vice versa go through the server.
Server state is stored inside SQLite database

### Settings

Settings UI also uses [iced-rs](https://github.com/iced-rs/iced) as a GUI framework.
It is run in separate OS process which communicates with server using inter-process communication
