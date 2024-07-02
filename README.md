# Auto Hide KB

Auto Hide VSCode sidebar, panel and notifications.

> This project is forked from [vscode-autohide](https://github.com/sirmspencer/vscode-autohide) and optimized for a better keyboard-only usage experience.

<p align='center'>
<b>English</b> | <a href="https://github.com/kvoon3/vscode-autohide-kb/blob/master/README.zh-CN.md">简体中文</a>
</p>

## New Features

1. AutoHideKB can be triggered by mouse, keyboard or commands, when you use mouse/keyboard to nav through files.
2. Added the ability to switch between auto mode and manual mode, you customize hide trigger time whatever you like.
3. Hide notifications, notifications can also config to auto hide.
4. Control hide behavior when look over git changes, [vscode-autohide](https://github.com/sirmspencer/vscode-autohide) always run hide when you open git changes.

## Commands

- `autoHide.enable`: enable autohide
- `autoHide.disable`: disable autohide
- `autoHide.toggleHideOnlyMouse`: Toggle whether to hide only with the mouse
- `autoHide.switchToAutoMode`: Switch to auto mode
- `autoHide.switchToManualMode`: Switch to manual mode
- `autoHide.runHide`: Execute hide immediately

## Configuration

### Hide Notifications

`autoHide.autoHideNotifications`: `boolean`

### Trigger Hide Only with Mouse

`autoHide.hideOnlyMouse`: `boolean`

Whether to hide only with the mouse. When disabled, hiding will be triggered by keyboard, commands, and mouse interactions.

### Mode Switching

`autoHide.mode`: `'auto' | 'manual'`

When in `auto` mode, AutoHideKB will handle event and try to hide panel. If you wanna trigger hide manually, set the config to `manual` and execute `autoHide.runHide` command whatever you like.

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
