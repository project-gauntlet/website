---
title: "Installation"
sidebar_position: 2
sidebar_label: "Installation"
---

## OS Support

### Official

- Linux X11 x86_64
- macOS M1

### Best-effort

- Linux Wayland x86_64
- Windows x86_64
- macOS x86_64

## macOS

Although it is possible to install Gauntlet by using `.dmg` directly, application doesn't have auto-update functionality so it is recommended to install using `brew` package manager

Brew package: [link](https://formulae.brew.sh/cask/gauntlet)

To install run:

```
brew install --cask gauntlet
```

To start, manually open application.

## Arch Linux

<table>
  <tr>
    <td><a href="https://aur.archlinux.org/packages/gauntlet-bin">gauntlet-bin</a></td>
    <td>Latest released version as a pre compiled binary. Recommended</td>
  </tr>
  <tr>
    <td><a href="https://aur.archlinux.org/packages/gauntlet-git">gauntlet-git</a></td>
    <td>Fresh changes built from the latest git commit. Unstable, may result in missing functionality or data corruption. Use at your own risk</td>
  </tr>
</table>

To install run:

```
yay -S gauntlet-bin
```

Or if you prefer a fresh build directly from github:

```
yay -S gauntlet-git
```

To start `systemd` service run:

```
systemctl --user enable --now gauntlet.service
```

## Nix

See installation instructions [here](https://github.com/project-gauntlet/gauntlet/blob/main/nix/README.md)

## Other Linux Distributions

At the moment application is available only for Arch Linux and Nix. If you want to create a package for other distributions see [Application packaging for Linux](#application-packaging-for-linux)

## Windows

Download `.msi` at [Releases page](https://github.com/project-gauntlet/gauntlet/releases/latest) and open to install Gauntlet

Note: application doesn't have auto-update functionality, and has to be updated manually

To start, manually open application.

## Application packaging for Linux

This section contains a list of things that could be useful for someone who wants to package application for Linux distribution.
If something is missing, please [create an issue](https://github.com/project-gauntlet/gauntlet/issues)

Application is already packaged for [Arch Linux](#arch-linux) and [Nix](#nix) so you can use them as examples

Relevant CLI commands:

- `gauntlet --minimized`
  - Server needs to be started when user logs in, e.g. using `systemd` service
- `gauntlet open`
  - Main windows is usually opened using global shortcut, this CLI command can be used in cases where global shortcut functionality is not available
- `gauntlet settings`
  - Settings are usually started on demand from Gauntlet itself

`.desktop` sample file can be found [here](https://github.com/project-gauntlet/gauntlet/blob/main/assets/linux/gauntlet.desktop)

`systemd` service sample file can be found [here](https://github.com/project-gauntlet/gauntlet/blob/main/assets/linux/gauntlet.service)

Application plugin depends on `gtk-launch`

### Wayland

Wayland support requires LayerShell protocol `zwlr_layer_shell_v1`
