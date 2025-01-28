---
title: "Versioning"
sidebar_position: 3
sidebar_label: "Versioning"
---

## Application

Application uses simple incremental integers starting from `1`.
It doesn't follow the SemVer versioning.
Given application's reliance on plugins, once it is stable,
introducing breaking changes will be done carefully (if at all) and will be given a reasonable grace period to migrate.
Before application is declared stable, breaking changes could be done without a grace period.

## Tools

[`@project-gauntlet/tools`](https://www.npmjs.com/package/@project-gauntlet/tools) uses SemVer.

## Plugins

Plugins only have the latest published "version" described by release date