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

<!-- commands -->

| Command                            | Title                                                           |
| ---------------------------------- | --------------------------------------------------------------- |
| `autoHide.toggleHideSideBar`       | Auto Hide: Toggle Auto Hide Side Bar for Current Workspace      |
| `autoHide.toggleHideAuxiliaryBar`  | Auto Hide: Toggle Auto Hide Auxiliary Bar for Current Workspace |
| `autoHide.toggleHidePanel`         | Auto Hide: Toggle Auto Hide Panel for Current Workspace         |
| `autoHide.toggleHideReferences`    | Auto Hide: Toggle Auto Hide References for Current Workspace    |
| `autoHide.toggleHideNotifications` | Auto Hide: Toggle Auto Hide Notifications for Current Workspace |
| `autoHide.toggleHideOnlyMouse`     | Auto Hide: Toggle hide Only mouse                               |
| `autoHide.toggleHidefromGit`       | Auto Hide: Toggle hide from git                                 |
| `autoHide.toggleMode`              | Auto Hide: toggle to manual/auto mode                           |
| `autoHide.runHide`                 | Auto Hide: Run hide immediately                                 |
| `autoHide.toggleEnable`            | Auto Hide: Toggle enable                                        |

<!-- commands -->

## Configurations

<!-- configs -->

| Key                         | Description                                      | Type      | Default                                                                                                |
| --------------------------- | ------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------ |
| `autoHide.ui`               |                                                  | `object`  | `{ "sideBar": true, "auxiliaryBar": true, "panel": true, "references": false, "notifications": true }` |
| `autoHide.enable`           | Enable Auto Hide                                 | `boolean` | `true`                                                                                                 |
| `autoHide.triggerOnOpen`    | Trigger hide when VSCode first opens.            | `boolean` | `true`                                                                                                 |
| `autoHide.triggerOnlyMouse` | Enable/Disable hide only with mouse event        | `boolean` | `true`                                                                                                 |
| `autoHide.triggerFromGit`   | Enable/Disable run hide when move to git changes | `boolean` | `false`                                                                                                |
| `autoHide.mode`             | set auto/manual mode                             | `string`  | `"auto"`                                                                                               |
| `autoHide.throttleTime`     | set throttle time                                | `number`  | `500`                                                                                                  |

<!-- configs -->

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
