# Auto Hide KB

Auto Hide VSCode sidebar and panels.

> This project is forked from [vscode-autohide](https://github.com/sirmspencer/vscode-autohide) and optimized for a better keyboard-only usage experience.

<p align='center'>
<b>English</b> | <a href="https://github.com/kvoon3/vscode-autohide-kb/blob/master/README.zh-CN.md">简体中文</a>
</p>

## New Features

1. Hiding can now be triggered by both keyboard and commands.
2. Added the ability to switch between auto mode and manual mode.

## Commands

- `autoHide.toggleHideOnlyMouse`: Toggle whether to hide only with the mouse
- `autoHide.switchToAutoMode`: Switch to auto mode
- `autoHide.switchToManualMode`: Switch to manual mode
- `autoHide.runHide`: Execute hide immediately

## Configuration

### Hide Only with Mouse

- Setting: `autoHide.hideOnlyMouse`
- Value: `boolean`

Whether to hide only with the mouse. When disabled, hiding will be triggered by keyboard, commands, and mouse interactions.

### Mode Switching

- Setting: `autoHide.mode`
- Value: `'auto' | 'manual'`
  - auto: Auto mode. Automatically listens and triggers hide
  - manual: Manual mode. Manually triggers hide with the command `autoHide.runHide`

## Manual Mode

You can use the autoHide.runHide command at the appropriate time according to your preferences

### VSCodeVim

Below is an example of a settings.json file with settings relevant to VSCodeVim:

```jsonc
// settings.json
{
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "after": [
        "i"
      ],
      "before": [
        "i"
      ],
      "commands": [
        "autoHide.runHide"
      ]
    },
    {
      "after": [
        "j"
      ],
      "before": [
        "j"
      ],
      "commands": [
        "autoHide.runHide"
      ]
    },
    {
      "after": [
        "k"
      ],
      "before": [
        "k"
      ],
      "commands": [
        "autoHide.runHide"
      ]
    },
    {
      "after": [
        "l"
      ],
      "before": [
        "l"
      ],
      "commands": [
        "autoHide.runHide"
      ]
    },
    {
      "after": [
        "h"
      ],
      "before": [
        "h"
      ],
      "commands": [
        "autoHide.runHide"
      ]
    },
    {
      "after": [
        "w"
      ],
      "before": [
        "w"
      ],
      "commands": [
        "autoHide.runHide"
      ]
    }
  ]
}
```
