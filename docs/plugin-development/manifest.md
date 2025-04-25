---
title: "Plugin Manifest"
sidebar_position: 2
sidebar_label: "Manifest"
---

## Overview

Plugin Manifest uses [TOML](https://toml.io) file format

## Main

### `$schema`

Some editors use `$schema` field to validate the content of the file. It is not used by Gauntlet.
The schema can be found at `https://raw.githubusercontent.com/project-gauntlet/gauntlet/refs/heads/main/docs/schema/plugin_manifest.schema.json`

| Type     | Required |
|----------|----------|
| `string` | no       |

### `gauntlet.name` 

Name of the plugin. Displayed in main search view on each item and in settings 

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `gauntlet.description`

Description of the plugin. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `gauntlet.authors.[*].name`

Name of one of the author of the plugin

| Type     | Required |
|----------|----------|
| `string` | no       |

### `gauntlet.authors.[*].uris`

List of URIs that identify the author. Can be a link to social media page or an email.

E.g. `https://github.com/Exidex` or `mailto:exidex@example.com`

| Type             | Required |
|------------------|----------|
| list of `string` | no       |

## Plugin Preferences

### `preferences.[*].id`

ID of the plugin preference. This will be used as name of the field in TypeScript.
Can only contain: numbers, uppercase and lowercase letters

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `preferences.[*].name`

Name of the plugin preference. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `preferences.[*].description`

Description of the plugin preference. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `preferences.[*].type`

Type of the plugin preference.
Allowed values: `"number"`, `"string"`, `"enum"`, `"bool"`, `"list_of_strings"`, `"list_of_numbers"` and `"list_of_enums"`

| Type   | Required |
|--------|----------|
| `enum` | yes      |

### `preferences.[*].default`

Provides default value for the plugin preference.
If not specified, preference will be considered required and user will be prompted to enter the value

If preference type is `"enum"` or `"list_of_enums"`, `enum_values` property has to be provided and default value has to be one of values defined in `enum_values`

Currently, not supported for list types, for which default value will be an empty list

| Type                                                                               | Required |
|------------------------------------------------------------------------------------|----------|
| `number`, `string`, `bool` or list of one of those depending on type of preference | no       |

### `preferences.[*].enum_values.[*].label`

Label of the enum value. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `preferences.[*].enum_values.[*].value`

Value of the enum value. One of these values will be used as a value of the field in TypeScript and in `default` property

| Type     | Required |
|----------|----------|
| `string` | yes      |


## Entrypoints

TODO description with link

### `entrypoint.[*].id`

Identifier of the entrypoint. Can only contain: numbers, lowercase letters and dash

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].name`

Name of the entrypoint. Displayed in main search view on each item, in settings and in bottom left of each plugin created view

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].description`

Description of the entrypoint. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].path`

Path to TypeScript source file (`.ts` or `.tsx`). Default export has to be a function, actual function signature depends on entrypoint type
 
| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].icon`

Path to assets file image file relative to `assets` directory. Currently displayed size is 18x18 pixels

| Type     | Required |
|----------|----------|
| `string` | no       |

### `entrypoint.[*].type`

Type of the entrypoint. Only following values are allowed: `"command"`, `"view"`, `"inline-view"` and `"entrypoint-generator"`

| Type   | Required |
|--------|----------|
| `enum` | yes      |


## Entrypoint Actions

### `entrypoint.[*].actions.[*].id`

ID of an action. Referenced from code to assign shortcut to an action.
Can only contain: numbers, uppercase and lowercase letters

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].actions.[*].description`

Description of the action. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].actions.[*].shortcut.key`

Key part of shortcut that can be used to execute action.

TODO list all possible values

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].actions.[*].shortcut.kind`

Kind of the shortcut. Allowed values: `"main"` and `"alternative"`

Modifiers:

- `"main"`
    - Windows and Linux: <kbd>CTRL</kbd>
    - macOS: <kbd>CMD</kbd>
- `"alternative"`
    - Windows and Linux: <kbd>ALT</kbd>
    - macOS: <kbd>OPT</kbd>

Whether <kbd>SHIFT</kbd> is also required depends on character specified for shortcut key,
e.g. `key` property value `"$"` will require <kbd>SHIFT</kbd> to be pressed, while `"4"` will not

| Type   | Required |
|--------|----------|
| `enum` | yes      |

## Entrypoint Preferences

### `entrypoint.[*].preferences.[*].id`

ID of the entrypoint preference. This will be used as name of the field in TypeScript.
Can only contain: numbers, uppercase and lowercase letters

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].preferences.[*].name`

Name of the entrypoint preference. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].preferences.[*].description`

Description of the entrypoint preference. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].preferences.[*].type`

Type of the entrypoint preference. 
Allowed values: `"number"`, `"string"`, `"enum"`, `"bool"`, `"list_of_strings"`, `"list_of_numbers"` and `"list_of_enums"`

| Type   | Required |
|--------|----------|
| `enum` | yes      |

### `entrypoint.[*].preferences.[*].default`

Provides default value for the entrypoint preference.
If not specified, preference will be considered required and user will be prompted to enter the value

If preference type is `"enum"` or `"list_of_enums"`, `enum_values` property has to be provided and default value has to be one of values defined in `enum_values`

Currently, not supported for list types, for which default value will be an empty list

| Type                                                                               | Required |
|------------------------------------------------------------------------------------|----------|
| `number`, `string`, `bool` or list of one of those depending on type of preference | no       |

### `entrypoint.[*].preferences.[*].enum_values.[*].label`

Label of the enum value. Displayed in settings

| Type     | Required |
|----------|----------|
| `string` | yes      |

### `entrypoint.[*].preferences.[*].enum_values.[*].value`

Value of the enum value. One of these values will be used as a value of the field in TypeScript and in `default` property

| Type     | Required |
|----------|----------|
| `string` | yes      |

## Permissions

Permission system in Gauntlet relies on Deno Security model. See [Deno documentation](https://docs.deno.com/runtime/fundamentals/security) for in depth information

### `permissions.[*].environment`

Allows plugin to set or read listed environment variables. Values are names of environment variables

| Type             | Required |
|------------------|----------|
| list of `string` | false    |

### `permissions.[*].network`

Allows plugin to make network requests, open network listeners or perform DNS resolution.
This includes making HTTP requests, opening TCP/UDP sockets, and listening for incoming connections on TCP or UDP.
Values are IPv4, IPv6 or domain name, with optional port number

| Type             | Required |
|------------------|----------|
| list of `string` | false    |

### `permissions.[*].filesystem.read`

Allows plugin to read files on the file system inside specified path.
This includes listing the contents of directories, checking for the existence of a given file, and connecting to Unix sockets

Only absolute paths are allowed

For Windows paths only `C:` drive is allowed to be specified

#### Path variables

Path permissions can contain also variables which will be resolved at plugin load time

Examples: `"{linux:user-home}/.local/share"`, `"{common:plugin-cache}/my-plugin-cache"`

Variables can only be used at the beginning of the path

List of currently available variables:
- `{macos:user-home}`
  - Resolves to `$HOME`, i.e. `/Users/<username>`
  - Only available if plugin supports macOS
- `{linux:user-home}`
  - Resolves to `$HOME`, i.e. `/home/<username>`
  - Only available if plugin supports Linux
- `{windows:user-home}`
  - Resolves to `{FOLDERID_Profile}`, i.e. `C:\Users\<username>`
  - Only available if plugin supports Windows
- `{common:plugin-data}`
  - On Windows: `{FOLDERID_RoamingAppData}\Gauntlet\data\plugins\<plugin-uuid>`
  - On Linux: `$XDG_DATA_HOME/gauntlet/plugins/<plugin-uuid>`
  - On macOS: `$HOME/Library/Application Support/dev.project-gauntlet.gauntlet/plugins/<plugin-uuid>`
- `{common:plugin-cache}`
  - On Windows: `{FOLDERID_LocalAppData}\Gauntlet\cache\plugins\<plugin-uuid>`
  - On Linux: `$XDG_CACHE_HOME/gauntlet/plugins/<plugin-uuid>`
  - On macOS: `$HOME/Library/Application Support/dev.project-gauntlet.gauntlet/plugins/<plugin-uuid>`

| Type             | Required |
|------------------|----------|
| list of `string` | false    |

### `permissions.[*].filesystem.write`

Allows plugin to write to files on the file system inside specified path.
This includes creating files or directories, writing to files and opening to Unix sockets

Only absolute paths are allowed

For Windows paths only `C:` drive is allowed to be specified

Path permissions can contain also variables which will be resolved at plugin load time.
See [filesystem read permissions section](#path-variables) for allowed variables

| Type             | Required |
|------------------|----------|
| list of `string` | false    |

### `permissions.[*].exec.command`

Allows plugins to spawn subprocesses.

:::warning

Plugin with ability to create subprocesses can effectively do any arbitrary action on user machine without declaring proper permissions

:::

Values are names of commands on `PATH` environment variable.
Actual path to used executable is resolved at plugin runtime load time due to restriction in Deno,
so spawning subprocess of command whose executable was created after plugin runtime load time will fail with permission error

| Type             | Required |
|------------------|----------|
| list of `string` | false    |

### `permissions.[*].exec.executable`

Allows plugins to spawn subprocesses

:::warning

Plugin with ability to create subprocesses can effectively do any arbitrary action on user machine without declaring proper permissions

:::

Only absolute paths are allowed

For Windows paths only `C:` drive is allowed to be specified

Path permissions can contain also variables which will be resolved at plugin load time.
See [filesystem read permissions section](#path-variables) for allowed variables

| Type             | Required |
|------------------|----------|
| list of `string` | false    |

### `permissions.[*].system`

Some APIs in Deno require special system information permission. See [Deno documentation](https://docs.deno.com/runtime/fundamentals/security/#system-information)

| Type             | Required |
|------------------|----------|
| list of `string` | false    |

### `permissions.[*].clipboard`

Allows plugin to read and manipulate OS clipboard via Gauntlet's [Clipboard API](../api-reference/clipboard.md)

Allowed values: `"read"`, `"write"` and `"clear"`

| Type           | Required |
|----------------|----------|
| list of `enum` | false    |


### `permissions.[*].main_search_bar`

Allows plugin to read value of main search bar at any time. Required to use [Inline view entrypoint](../api-reference/entrypoint-types/inline-view.mdx)

Allowed values: `"read"`

| Type           | Required |
|----------------|----------|
| list of `enum` | false    |


## Other

### `supported_system.[*].os`

Specifies which OS is supported by plugin. Only required if plugin uses one of the following permissions: 
environment variables, filesystem, system, exec. If plugin doesn't use any of those permissions, plugin is considered cross-platform

Allowed values: `"linux"`, `"windows"` and `"macos"`

| Type   | Required |
|--------|----------|
| `enum` | true     |
