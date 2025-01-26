---
title: "Storage and Cache"
sidebar_position: 7
sidebar_label: "Storage and Cache"
---

## Overview

In Gauntlet there are 3 tiers of hooks to manage your view state: `useState`, `useCache` and `useStorage`

- `useState`
  - Provided by React
  - State is not saved between view re-openings
- `useCache`
  - Provided by Gauntlet
  - Ephemeral, state saved between view re-openings, but not between plugin restarts
  - Internally uses `sessionStorage`
- `useStorage`
  - Provided by Gauntlet
  - Persistent, state saved between view re-openings and between plugin restarts
  - Internally uses `localStorage`


## `useState`

TODO example, type

## `useCache`

TODO example, type

## `useStorage`

TODO example, type


