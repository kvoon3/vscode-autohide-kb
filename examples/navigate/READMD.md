# Navigation

> [!Tip]
> This is optional configuration for keyboard-only users who rely on specific VS Code/Vim commands for window navigation.

## VS Code Commands:
1. `workbench.action.navigateLeft`
2. `workbench.action.navigateRight`
3. `workbench.action.navigateBottom`

## Vim Keybindings:
1. `<Ctrl-w> + h`
2. `<Ctrl-w> + j`
3. `<Ctrl-w> + k`
4. `<Ctrl-w> + l`

## Why?
When the panel is hidden, using the standard `workbench.action.navigateXXX` commands to switch panels won't work effectively.

## Solution

Auto Hide KB provides corresponding commands as alternatives to VS Code's native navigation:

1. `autoHide.action.navigateLeft`
2. `autoHide.action.navigateRight`
3. `autoHide.action.navigateBottom`
4. `autoHide.action.focusActiveEditorGroupWithHide`

We need to implement navigation in two directions:

1. **From editor to panels**: Use `autoHide.action.navigateXXX`
2. **Back to editor**: Use `autoHide.action.focusActiveEditorGroupWithHide`

## Usage

Copy these code into your VS Code:

- [VS Code](./vscode-vim)
- [VS Code Vim](./vim)
