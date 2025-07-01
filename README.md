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

### 🎯 More Trigger Methods

`Auto Hide KB` can be triggered by the cursor, keyboard, or even commands.

### 🔄 Mode Switching

Auto/Manual mode is provided.

### 📊 Status Bar

help you control auto-hide:

1. Vim like mode toggle `--AUTO--`, `--MANUAL--`
2. Pin sidebar
3. Run hide immediately

### 🚀 And More...

1. [Cursor](https://www.trycursor.com) chat panel support
2. Whitelist

> [!NOTE]
> #### How do i use manual mode?
>
> In manual mode, we stop detecting your cursor or keyboard events.
>
> Instead, you can now bind [`autoHide.runHide` command](./#commands) to your specific use case - custom keybindings in VS Code.
>
> See: [Full Example](./examples)

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
| `autoHide.statusBarText.trigger` | Status bar item label, See https://code.visualstudio.com/api/references/icons-in-labels#icon-listing to customize icon | `string`        | `"$(eye-closed)"`                                                                                          |
| `autoHide.statusBarText.mode`    | Status bar label for mode, use $(mode) to get current mode                                                             | `string,object` | `"-- $(mode) --"`                                                                                          |
| `autoHide.navigateFallback`      | Navigate fallback settings                                                                                             | `object`        | `{"left":"sidebar","right":"auxiliaryBar","down":"panel"}`                                                 |

<!-- configs -->

## Commands

<!-- commands -->

| Command                          | Title                               |
| -------------------------------- | ----------------------------------- |
| `autoHide.toggleEnable`          | Auto Hide: Toggle enable            |
| `autoHide.toggleMode`            | Auto Hide: Toggle manual/auto mode  |
| `autoHide.runHide`               | Auto Hide: Run hide immediately     |
| `autoHide.togglePinSidebar`      | Auto Hide: Toggle pin sidebar       |
| `autoHide.togglePinAuxiliaryBar` | Auto Hide: Toggle pin auxiliary bar |
| `autoHide.togglePinPanel`        | Auto Hide: Toggle pin panel         |

<!-- commands -->

### Navigate To Panel

Due to the panel being hidden, using the `workbench.action.navigateXXX` commands to switch panels will be ineffective.

Auto Hide KB provides the following commands as alternatives to VSCode's `navigateXXX` commands:

| Navigate Command                                 | Description                                                     |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `autoHide.action.navigateLeft`                   | `workbench.action.navigateLeft` with fallback to Sidebar        |
| `autoHide.action.navigateRight`                  | `workbench.action.navigateRight` with fallback to Auxiliary Bar |
| `autoHide.action.navigateDown`                   | `workbench.action.navigateDown` with fallback to Panel          |
| `autoHide.action.focusActiveEditorGroupWithHide` | `workbench.action.focusActiveEditorGroup` with autoHide         |

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
        "command": "autoHide.action.navigateDown",
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
        "command": "autoHide.action.focusActiveEditorGroupWithHide",
        "when": "panelFocus"
      }
    ]
    ```
</details>

## Credits

- Enhanced functionality for VSCode commands, powered by [Command Task](https://github.com/kvoon3/vscode-command-task)

## License

[MIT](./LICENSE.md) License © 2020-PRESENT [Kevin Kwong](https://github.com/kvoon3) & Matthew Spencer
