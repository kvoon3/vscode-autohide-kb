# Auto Hide KB

自动隐藏 VSCode 侧边栏和面板。

> 本项目 fork 自[vscode-autohide](https://github.com/sirmspencer/vscode-autohide)，针对纯键盘操作的使用体验进行了优化。

<p align='center'>
<a href="https://github.com/kvoon3/vscode-autohide-kb/blob/master/README.md">English</a> | <b>简体中文</b>
</p>

## 新特性

1. 键盘和命令也可以触发隐藏
2. 自动/手动模式切换

## 命令

- `autoHide.toggleHideOnlyMouse`: 切换是否仅通过鼠标隐藏

- `autoHide.switchToAutoMode`: 切换到自动模式

- `autoHide.switchToManualMode`: 切换到手动模式

- `autoHide.runHide`: 立即执行隐藏操作

## 配置

### 仅鼠标隐藏

- 配置：`autoHide.hideOnlyMouse`
- 取值：`boolean`

是否仅通过鼠标隐藏，关闭时键盘、命令和鼠标的操作都会触发隐藏

### 模式切换

- 配置：`autoHide.mode`
- 取值：`'auto' | 'manual'`
  - auto：自动模式。自动监听并触发隐藏
  - manual：手动模式。通过命令`autoHide.runHide`手动触发隐藏

## 手动模式

你可以根据自己的偏好设置在合适的时机使用`autoHide.runHide` 命令

### VSCodeVim

下面为 VSCodeVim 的 setting.json 配置示例

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
