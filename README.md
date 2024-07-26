# Auto Hide KB

Auto Hide VSCode sidebar, panel and notifications，with better keyboard-only usage experience.

<p align='center'>
<b>English</b> | <a href="https://github.com/kvoon3/vscode-autohide-kb/blob/master/README.zh-CN.md">简体中文</a>
</p>

## New Features

1. Can be triggered by keyboard and commands, auto hide worked fine not only when you click.
2. Auto/Manual mode switching, customize trigger time whatever you like.
3. Hide notifications, notifications can also config to auto hide.
4. Control hide behavior when look over git changes, [vscode-autohide](https://github.com/sirmspencer/vscode-autohide) always run hide when you open git changes.
5. Added throttle time to reduce the event frequency.

## Commands

| ID                                | Description                                          |
| --------------------------------- | ---------------------------------------------------- |
| `autoHide.toggleHideSideBar`      | Toggle Auto Hide Side Bar for Current Workspace      |
| `autoHide.toggleHideAuxiliaryBar` | Toggle Auto Hide Auxiliary Bar for Current Workspace |
| `autoHide.toggleHidePanel`        | Toggle Auto Hide Panel for Current Workspace         |
| `autoHide.toggleHideOnlyMouse`    | Toggle whether to hide only with the mouse           |
| `autoHide.switchToAutoMode`       | Switch to auto mode                                  |
| `autoHide.switchToManualMode`     | Switch to manual mode                                |
| `autoHide.runHide`                | Execute hide immediately                             |
| `autoHide.enable`                 | Enable autohide                                      |
| `autoHide.disable`                | Disable autohide                                     |

## Configuration

| Setting                                     | Description                                                                                                                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoHide.enable`: `boolean`                | Enable/Disable Auto Hide                                                                                                                                                   |
| `autoHide.autoHideSideBar`: `boolean`       | Hide the side bar when the user clicks into a text editor.                                                                                                                 |
| `autoHide.autoHideAuxiliaryBar`: `boolean`  | Hide the auxiliary bar (second side bar) when the user clicks into a text editor.                                                                                          |
| `autoHide.autoHidePanel`: `boolean`         | Hide the panel (output, terminal, etc.) when the user clicks into a text editor.                                                                                           |
| `autoHide.autoHideReferences`: `boolean`    | Hide the References panel (`Go to References`) when the user clicks into a text editor.                                                                                    |
| `autoHide.autoHideNotifications`: `boolean` | Hide the notifications when the user clicks into a text editor.                                                                                                            |
| `autoHide.hideOnOpen`: `boolean`            | Hide side bar and panel when VSCode first opens.                                                                                                                           |
| `autoHide.hideOnlyMouse`: `boolean`         | Enable/Disable hide only with mouse. If disabled, keyboard and commands will also trigger hide.                                                                            |
| `autoHide.hideFromGit`: `boolean`           | Enable/Disable run hide when open git changes.                                                                                                                             |
| `autoHide.mode`: `'auto' \| 'manual'`       | Set auto/manual mode. In `auto` mode, AutoHideKB will handle event and try to hide panel. In `manual` mode, you can trigger hide manually with `autoHide.runHide` command. |
| `autoHide.throttleTime`: `number`           | Set throttle time in milliseconds.                                                                                                                                         |

### Mode

#### Manual Mode With Commands Palette

Open vscode commands palette with `ctrl/cmd+shift+p` and search 'Auto Hide: Run hide immediately' to trigger hide.

#### Manual Mode With VSCodeVim

When you use VSCodeVim extension you can binding 'autoHide.runHide' with specific keys, for example:

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
