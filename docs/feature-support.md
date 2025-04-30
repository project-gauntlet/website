---
title: "Feature Support"
sidebar_position: 7
sidebar_label: "Feature Support"
---

## Features
- Window tracking: whether Gauntlet is able to track which windows are open and which application created them

## Matrix
- ✅ - supported
- ❌ - not currently supported/possible/explored 

|                  | macOS | Linux X11 | Linux Wayland | Windows |
|------------------|-------|-----------|---------------|---------|
| Window Tracking  | ❌     | ✅         | ✅ [1]         | ❌       |
| Global Shortcuts | ✅     | ✅         | ❌ [2]         | ✅       |

## Notes
1. Window Tracking on Wayland is currently only supported on wlroots-based window managers and Cosmic
2. Some Wayland window managers like KDE or Cosmic support legacy X11 API for registering global shortcuts
