---
title: "Feature Support"
sidebar_position: 7
sidebar_label: "Feature Support"
---

|                  | macOS | Linux X11 | Linux Wayland | Windows |
|------------------|-------|-----------|---------------|---------|
| Windows Tracking | ✅     | ✅         | ✅ [1]         | ❌       |
| Global Shortcuts | ✅     | ✅         | ❌ [2]         | ✅       |

### Notes
1. Window Tracking is currently only supported on wlroots-based window managers and Cosmic
2. Some Wayland window managers like KDE or Cosmic support legacy X11 API for registering global shortcuts
