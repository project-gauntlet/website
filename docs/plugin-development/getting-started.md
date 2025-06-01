---
title: "Getting Started"
sidebar_position: 1
sidebar_label: "Getting Started"
---

This page describes what you need to get started with creating your first Gauntlet plugin 

## Prerequisites

- You have Gauntlet [installed and running](../installation.md)
- You have [Node.js](https://nodejs.org/en) installed
- You have [npm](https://www.npmjs.com/) installed

:::note

Gauntlet documentation will assume some basic knowledge of React and TypeScript.
If you need some help with that, check out TypeScript's [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) and React's [Getting Started](https://react.dev/learn) guide

:::

:::note

Gauntlet documentation also assumes that you have Plugin API TypeScript Declarations files of `@project-gauntlet/api` package open in your favourite IDE alongside this documentation

:::

:::note

This page assumes that you will be using GitHub and GitHub Actions to host plugin repository and publish it.
It is possible to use any other hosting solution with some minor changes to the plugin template, but it is outside the scope of this documentation

:::

## Getting development environment ready

1. Using https://github.com/project-gauntlet/plugin-template template, create your own repository from it
2. Clone newly created repository to your machine
3. Run `npm install` to install dependencies

## Running dev server

To run the dev server, run `npm run dev` command

1. Make sure that Gauntlet is running on your system 
2. Dev server will compile the plugin, do the type checking and validate the manifest
3. Dev server will then connect to Gauntlet and install dev plugin so it is usable like a regular plugin 
4. Any changes made to plugin's source code and manifest will be automatically reflected in Gauntlet UI when file is saved while the dev server is running

:::note

Plugins installed via `npm run dev` are using React Dev mode to have better error messages for development.
This comes with a tradeoff of having worse performance when rendering the view

:::

## Building

Dev server will automatically build plugin, but sometimes it is useful to build the plugin without running the dev server.
For this `npm run build` command is available

## Publishing

Publishing a plugin may be a different in Gauntlet than use are used to. It is distributed, and doesn't have any central system

Plugins are distributed as a part of the same git repository which contains the code (similar to GitHub Pages).
To publish the plugin you need to run `npm run publish`. But because during publishing process changes are being made to the git repository,
it is **strongly** encouraged to use CI/CD to do it, template repository has predefined workflow already available

Compiled plugin is stored on `gauntlet/release` branch and when installing plugin using git repository url (same as the one used for `git clone`),
Gauntlet will download that branch and install plugin from there.
