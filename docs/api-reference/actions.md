---
title: "Actions"
sidebar_position: 4
sidebar_label: "Actions"
---

## Overview

Action is a piece of code executed on some kind of user action, be it mouse click or shortcut press. 

In UI list of actions is displayed in an Action Panel.

Actions can be executed using shortcuts, custom and predefined ones.
First and second actions in Action Panel become primary and secondary actions respectively.
Primary action gets automatically assigned <kbd>Enter</kbd> shortcut and secondary - <kbd>Shift</kbd> + <kbd>Enter</kbd>.
Even though it is still possible to assign custom shortcuts to primary and secondary actions, they will not be visible in action panel in UI

Actions can be defined for entrypoints or views.

## Actions in Generated Entrypoints

See [Entrypoint Generator](entrypoint-types/entrypoint-generator.mdx)

## Actions in View and Command Entrypoints

For `"view"` and `"command"` entrypoints, currently, it is not possible to define additional actions.
The file referenced in manifest becomes primary action

## Actions inside Views

Actions in views are often context-aware, e.g. based on the selected list item.
Actions in Action Panel can be grouped into semantic sections and have keyboard shortcuts assigned.

TODO close view

### Api Reference

TODO code ref with screenshots

