---
title: "Installation"
sidebar_position: 2
sidebar_label: "Installation"
---

## macOS

Although it is possible to install Gauntlet by using `.dmg` directly, application doesn't have auto-update functionality so it is recommended to install using `brew` package manager

Brew package: [link](https://formulae.brew.sh/cask/gauntlet)

To install run:
```
brew install --cask gauntlet
```

To start, manually open application.

## Windows

Although it is possible to install Gauntlet by using `.msi` directly, application doesn't have auto-update functionality so it is recommended to install using `chocolatey` package manager

Chocolatey package: [link](https://community.chocolatey.org/packages/gauntlet)

To install run:
```
choco install gauntlet
```

To start, manually open application.

## Arch Linux

AUR package: [link](https://aur.archlinux.org/packages/gauntlet-bin)

To install run:
```
yay -S gauntlet-bin
```

To start `systemd` service run:
```
systemctl --user enable --now gauntlet.service
```

## Nix

See installation instructions [here](https://github.com/project-gauntlet/gauntlet/blob/main/nix/README.md)

## Other Linux Distributions

At the moment application is available only for Arch Linux and Nix. If you want to create a package for other distributions see [Application packaging for Linux](#application-packaging-for-Linux)

### Application packaging for Linux

This section contains a list of things that could be useful for someone who wants to package application for Linux distribution.
If something is missing, please [create an issue](https://github.com/project-gauntlet/gauntlet/issues)

Application is already packaged for [Arch Linux](#arch-linux) and [Nix](#nix) so you can use them as examples

Relevant CLI commands:

- `$ gauntlet --minimized`
    - Server needs to be started when user logs in, e.g. using `systemd` service
- `$ gauntlet open`
    - Main windows is usually opened using global shortcut, this CLI command can be used in cases where global shortcut functionality is not available
- `$ gauntlet settings`
    - Settings are usually started on demand from Gauntlet itself

`.desktop` sample file can be found [here](https://github.com/project-gauntlet/gauntlet/blob/main/assets/linux/gauntlet.desktop)

`systemd` service sample file can be found [here](https://github.com/project-gauntlet/gauntlet/blob/main/assets/linux/gauntlet.service)

#### Wayland

Wayland support requires LayerShell protocol `zwlr_layer_shell_v1`
