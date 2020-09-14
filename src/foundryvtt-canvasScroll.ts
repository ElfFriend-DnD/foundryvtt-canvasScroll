// Import TypeScript modules
import { registerSettings } from './module/settings';
import { MODULE_ID, MySettings } from './constants';
import { log } from './helpers';
import { libWrapper } from './shim';

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async function () {
  log(`Initializing ${MODULE_ID}`);

  registerSettings();
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
  // without these wrappers in setup, we weren't initializing early enough

  // override the KeyboardManager.onWheel
  libWrapper.register(
    MODULE_ID,
    'KeyboardManager.prototype._onWheel',
    function (_onWheel, event: WheelEvent) {
      if (!game.settings.get(MODULE_ID, MySettings.enable)) {
        return _onWheel(event);
      }

      // Prevent zooming the entire browser window
      if (event.ctrlKey) {
        event.preventDefault();
      }

      // // Handle wheel events for the canvas if it is ready and if it is our hover target
      let hover = document.elementFromPoint(event.clientX, event.clientY);

      // // canvas specific
      if (canvas && canvas.ready && hover && hover.id === 'board') {
        event.preventDefault();
        let layer = canvas.activeLayer;
        let isCtrl = event.ctrlKey || event.metaKey;

        // Case 1 - rotate tokens or tiles
        if (layer instanceof PlaceablesLayer && isCtrl) {
          if (event.deltaY === 0) return; // Only support vertical scroll events for rotation

          //@ts-ignore
          layer._onMouseWheel(event);
        } else {
          // Case 2 - zoom the canvas
          canvas._onMouseWheel(event);
        }
      }
    },
    'MIXED' // this is actually an override unless the setting is disabled
  );

  // override the onMouseWheel for canvas
  libWrapper.register(MODULE_ID, 'Canvas.prototype._onMouseWheel', function (_onMouseWheel, event: WheelEvent) {
    if (!game.settings.get(MODULE_ID, MySettings.enable)) {
      return _onMouseWheel(event);
    }

    // pressing alt, proceed like usual (zoom)
    if (event.altKey) {
      return _onMouseWheel(event);
    }

    const multiplier = game.settings.get(MODULE_ID, MySettings.scrollMultiplier);
    const smoothScrollingDuration = game.settings.get(MODULE_ID, MySettings.smoothScrollingDuration);

    // if we are pressing shift, scroll sideways
    const dy = (event.shiftKey ? event.deltaX : event.deltaY) * multiplier;
    const dx = (event.shiftKey ? event.deltaY : event.deltaX) * multiplier;

    // make option to toggle smooth scrolling, duration
    if (dx || dy) {
      const panXY = {
        x: this.stage.pivot.x + dx,
        y: this.stage.pivot.y + dy,
      };

      if (smoothScrollingDuration > 0) {
        return this.animatePan({
          ...panXY,
          duration: smoothScrollingDuration,
        });
      } else {
        return this.pan(panXY);
      }
    }
  });
});
