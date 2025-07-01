# Manual Mode

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
