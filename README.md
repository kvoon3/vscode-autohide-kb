<p align="center">
<img  src="https://github.com/kvoon3/vscode-autohide-kb/blob/main/res/icon.png?raw=true" height="150" />
</p>

<h1 align="center">Auto Hide KB <sup>VS Code</sup></h1>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=kevin-kwong.vscode-autohide-keyboard" target="__blank"><img alt="Visual Studio Marketplace Version" src="https://img.shields.io/visual-studio-marketplace/v/kevin-kwong.vscode-autohide-keyboard?label=VS%20Code%20Marketplace&color=eee"></a>
<a href="https://kermanx.github.io/reactive-vscode/" target="__blank"><img src="https://img.shields.io/badge/made_with-reactive--vscode-%23eee?style=flat"  alt="Made with reactive-vscode" /></a>
</p>

<p align="center">
Auto Hide VSCode sidebar, panel and notifications, with better keyboard-only usage experience.
</p>

## New Features

1. Triggered by cursor, keyboard and commands
2. Throttle trigger event
3. Auto/Manual mode switching
4. Whitelist support
5. More ui to hide, and [Cursor](https://www.trycursor.com) panel compatible
6. Status bar button

## Commands

<!-- commands -->

| Command                 | Title                              |
| ----------------------- | ---------------------------------- |
| `autoHide.toggleEnable` | Auto Hide: Toggle enable           |
| `autoHide.toggleMode`   | Auto Hide: Toggle manual/auto mode |
| `autoHide.runHide`      | Auto Hide: Run hide immediately    |

<!-- commands -->

And [Extra Commands](#extra-commands)

## Configurations

<!-- configs -->

| Key                              | Description                                                                                                            | Type            | Default                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `autoHide.enable`                | Whether enable Auto Hide                                                                                               | `boolean`       | `true`                                                                                                     |
| `autoHide.ui`                    | UI hideable settings                                                                                                   | `object`        | `{"sidebar":true,"auxiliaryBar":true,"panel":true,"references":false,"notifications":true,"cursor":false}` |
| `autoHide.triggerOnOpen`         | Whether trigger when open                                                                                              | `boolean`       | `true`                                                                                                     |
| `autoHide.triggerKind`           | Use which kind of event to trigger hide                                                                                | `array`         | `["mouse","command","keyboard"]`                                                                           |
| `autoHide.mode`                  | Auto/Manual mode                                                                                                       | `string`        | `"auto"`                                                                                                   |
| `autoHide.throttleTime`          | Throttle trigger time in ms                                                                                            | `number`        | `500`                                                                                                      |
| `autoHide.whitelist`             | Set editor whitelist , support RegExp, default match status is focus                                                   | `array`         | `["git","output",{"match":"debug","status":["visible"]}]`                                                  |
| `autoHide.statusBarText.trigger` | Status bar item label, See https://code.visualstudio.com/api/references/icons-in-labels#icon-listing to customize icon | `string`        | `"$(eye-closed) Hide"`                                                                                     |
| `autoHide.statusBarText.mode`    | Status bar label for mode, use $(mode) to get current mode                                                             | `string,object` | `"-- $(mode) --"`                                                                                          |
| `autoHide.navigateFallback`      | Navigate fallback settings                                                                                             | `object`        | `{"left":"sidebar","right":"auxiliaryBar","down":"panel"}`                                                 |

<!-- configs -->

### Manual Mode

Usage example:

1. Commands palette:

    Open vscode commands palette with `ctrl/cmd+shift+p` and search 'Auto Hide: Run hide immediately' to trigger hide.

2. KeyBinding:
    ```jsonc
    // keybindings.json
    {
      "key": "ctrl+h",
      "command": "autoHide.runHide",
      "when": "editorFocus"
    }
    ```

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

## Extra Commands

### Navigate To Panel

Due to the panel being hidden, using the `workbench.action.navigateXXX` commands to switch panels will be ineffective.

Auto Hide KB provides the following commands as alternatives to VSCode's `navigateXXX` commands:

| Navigate Command                   | Description                                                   |
| ---------------------------------- | ------------------------------------------------------------- |
| `commandTask.action.navigateLeft`  | workbench.action.navigateLeft with fallback to Sidebar        |
| `commandTask.action.navigateRight` | workbench.action.navigateRight with fallback to Auxiliary Bar |
| `commandTask.action.navigateDown`  | workbench.action.navigateDown with fallback to Panel          |

See [Config: `autoHide.navigateFallback`](#configurations) to Customize

<details>
<summary>Usage example:</summary>

[Full Example](./examples/navigate)

Navigate to panel:

1. editor -> panel:

    ```jsonc
    // keybindings.json
    [
      {
        "key": "ctrl+w down",
        "command": "commandTask.action.navigateDown",
        "when": "editorFocus"
      }
    ]
    ```

2. panel -> editor:

    ```jsonc
    // keybindings.json
    [
      {
        "key": "ctrl+w up",
        "command": "commandTask.action.focusActiveEditorGroup",
        "when": "panelFocus"
      }
    ]
    ```

    Use  `autoHide` when navigate back to editor (optional):

    Create command by [Command Task](https://github.com/kvoon3/vscode-command-task)

    ```jsonc
    // settings.json
    {
      "commandTask.add": [
        {
          "name": "action.focusActiveEditorGroupWithHide",
          "try": "workbench.action.focusActiveEditorGroup",
          "finally": "autoHide.runHide"
        }
      ]
    }
    ```

    Replace with new command

    ```diff
    // keybindings.json
    [
      {
        "key": "ctrl+w k",
    +   "command": "commandTask.action.focusActiveEditorGroupWithHide",
    -   "command": "commandTask.action.focusActiveEditorGroup",
        "when": "panelFocus"
      }
    ]
    ```

</details>

## Credits

- Enhanced functionality for VSCode commands, powered by [Command Task](https://github.com/kvoon3/vscode-command-task)

## License

[MIT](./LICENSE.md) License © 2020-PRESENT [Kevin Kwong](https://github.com/kvoon3) & Matthew Spencer
