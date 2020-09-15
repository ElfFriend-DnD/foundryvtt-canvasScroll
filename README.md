# Deprecated in favor of [Zoom Pan Options](https://foundryvtt.com/packages/zoom-pan-options/)

@itamarcu is the author of the Cursor Zoom module, which he rewrote and expanded into Zoom Pan Options. I'll be contributing to Zoom Pan Options intsead of Canvas Scroll going forward.

----
## Canvas Scroll Legacy Information

Similar to Roll20, I want to be able to use my scroll wheel to pan instead of zoom. The goal of this module is to make trackpad users happier.

## Installation

Module JSON:
```
https://github.com/ElfFriend-DnD/foundryvtt-canvasScroll/releases/latest/download/module.json
```

## Key Features & Changes

### Scroll Behavior

#### Windows
| **Combo**         | Module Behavior                             | Foundry Default Behavior                    |
| ----------------- | ------------------------------------------- | ------------------------------------------- |
| Mouse Wheel (MW)  | Pan Up/Down                                 | Zoom                                        |
| SHIFT + MW        | Pan Left/Right                              | Rotate selected object in larger increments |
| CTRL + MW         | Rotate selected object in finer increments  | Rotate selected object in finer increments  |
| CTRL + SHIFT + MW | Rotate selected object in larger increments | Same (Nothing special)                      |
| ALT + MW          | Zoom                                        | Same (Nothing special)                      |


#### OSX
| **Combo**         | Module Behavior                            | Foundry Default Behavior                         |
| ----------------- | ------------------------------------------ | ------------------------------------------------ |
| Touchpad (Apple)  | Pan Up/Down/Left/Right                     | Zoom                                             |
| Mouse Wheel (MW)  | Pan Up/Down                                | Zoom                                             |
| SHIFT + MW        | Pan Left/Right                             | _Not actually sure but I suspect it was bugged._ |
| CTRL + MW         | Rotate selected object in finer increments | Rotate selected object in finer increments       |
| CTRL + SHIFT + MW | Nothing...                                 | _Not sure, suspect also bugged._                 |
| ALT/Option + MW   | Zoom                                       | Same (Nothing special)                           |

## Options

| **Setting**               | Description                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Enable Canvas Scrolling   | Enables or disables a client's preference for this behavior override.                                      |
| Scroll Multiplier         | Slider to control how much the canvas moves on a scroll event. Higher means more movement.                 |
| Smooth Scrolling Duration | Slider to control how long the smooth scrolling takes. Set to 0 to turn off smooth scrolling all together. |

All settings are per client and not per world.

### Recommendations

- Apple Magic Trackpad - Smooth Scrolling Duration: 0



### Compatibility

There is a non-trivial chance that a module also affecting the scroll wheel behavior of the canvas will conflict in a bad way with this one. I've used [libWrapper](https://github.com/ruipin/fvtt-lib-wrapper) in an attempt to avoid such a thing.

| **Name**                                                    |       Works        | Notes                     |
| ----------------------------------------------------------- | :----------------: | ------------------------- |
| [Cursor Zoom](https://foundryvtt.com/packages/cursor-zoom/) | :heavy_check_mark: | No conflict, works great. |

#### Module Dev Notes

This module works by first replacing the `KeyboardManager._onWheel` behavior, then the `Canvas._onMouseWheel` when the setting is enabled. `KeyboardManager._onWheel`'s stack is never followed if enabled, but `Canvas._onMouseWheel`'s is if the user is holding `ALT`.


## Known Issues

- None yet.

## Acknowledgements

Bootstrapped with Nick East's [create-foundry-project](https://gitlab.com/foundry-projects/foundry-pc/create-foundry-project).

Mad props to the [League of Extraordinary FoundryVTT Developers](https://forums.forge-vtt.com/c/package-development/11) community which helped me figure out a lot.

## License
This Foundry VTT module, written by Andrew Krigline, is licensed under a Creative Commons Attribution 4.0 International License.

This work is licensed under Foundry Virtual Tabletop EULA - Limited License Agreement for module development v 0.1.6.
