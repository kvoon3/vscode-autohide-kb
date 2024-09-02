<p align="center">
<img  src="https://github.com/kvoon3/vscode-autohide-kb/blob/master/res/icon.png?raw=true" height="150" />
</p>

<h1 align="center">Auto Hide KB <sup>VS Code</sup></h1>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=kevin-kwong.vscode-autohide-keyboard" target="__blank"><img alt="Visual Studio Marketplace Version" src="https://img.shields.io/visual-studio-marketplace/v/kevin-kwong.vscode-autohide-keyboard?label=VS%20Code%20Marketplace&color=eee"></a>
<a href="https://kermanx.github.io/reactive-vscode/" target="__blank"><img src="https://img.shields.io/badge/made_with-reactive--vscode-%23eee?style=flat"  alt="Made with reactive-vscode" /></a>
</p>

<p align="center">
Auto Hide VSCode sidebar, panel and notifications，with better keyboard-only usage experience.
</p>

## New Features

1. Triggered by keyboard and commands
2. Throttle trigger event
3. Auto/Manual mode switching
4. Whitelist support
5. More ui to hide, and [Cursor](https://www.trycursor.com) panel compatible

## Commands

<!-- commands -->

| Command                 | Title                                 |
| ----------------------- | ------------------------------------- |
| `autoHide.toggleEnable` | Auto Hide: Toggle enable              |
| `autoHide.toggleMode`   | Auto Hide: toggle to manual/auto mode |
| `autoHide.runHide`      | Auto Hide: Run hide immediately       |

<!-- commands -->

## Configurations

<!-- configs -->

| Key                      | Description                                                                                                            | Type      | Default                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `autoHide.enable`        | Whether enable Auto Hide                                                                                               | `boolean` | `true`                                                                                                     |
| `autoHide.ui`            | UI hideable settings                                                                                                   | `object`  | `{"sidebar":true,"auxiliaryBar":true,"panel":true,"references":false,"notifications":true,"cursor":false}` |
| `autoHide.triggerOnOpen` | Whether trigger when open                                                                                              | `boolean` | `true`                                                                                                     |
| `autoHide.triggerKind`   | Use which kind of event to trigger hide                                                                                | `array`   | `["mouse","command","keyboard"]`                                                                           |
| `autoHide.mode`          | Auto/Manual mode                                                                                                       | `string`  | `"auto"`                                                                                                   |
| `autoHide.throttleTime`  | Throttle trigger time in ms                                                                                            | `number`  | `500`                                                                                                      |
| `autoHide.whitelist`     | set whitelist for editor scheme, support RegExp                                                                        | `array`   | `["git","debug"]`                                                                                          |
| `autoHide.label`         | Status bar item label, See https://code.visualstudio.com/api/references/icons-in-labels#icon-listing to customize icon | `string`  | `"$(eye-closed) Hide"`                                                                                     |

<!-- configs -->

### Manual Mode

Usage example:

1. Commands palette:

    Open vscode commands palette with `ctrl/cmd+shift+p` and search 'Auto Hide: Run hide immediately' to trigger hide.

2. VSCodeVim:

    ```jsonc
    // settings.json
    {
      "vim.normalModeKeyBindingsNonRecursive": [
        {
          "after": ["i"],
          "before": ["i"],
          "commands": ["autoHide.runHide"]
        },
        {
          "after": ["j"],
          "before": ["j"],
          "commands": ["autoHide.runHide"]
        },
        {
          "after": ["k"],
          "before": ["k"],
          "commands": ["autoHide.runHide"]
        },
        {
          "after": ["l"],
          "before": ["l"],
          "commands": ["autoHide.runHide"]
        },
        {
          "after": ["h"],
          "before": ["h"],
          "commands": ["autoHide.runHide"]
        }
      ]
    }
    ```
