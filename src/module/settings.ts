import { MODULE_ID, MySettings } from '../constants';

export const registerSettings = function () {
  game.settings.register(MODULE_ID, MySettings.enable, {
    name: 'Enable Canvas Scrolling',
    default: false,
    type: Boolean,
    scope: 'client',
    config: true,
    hint: 'Disable foundry default scroll to zoom and instead use scroll to pan.',
  });

  game.settings.register(MODULE_ID, MySettings.scrollMultiplier, {
    name: 'Scroll Distance',
    default: 3,
    type: Number,
    range: {
      min: 1,
      max: 6,
      step: 0.5,
    },
    scope: 'client',
    config: true,
    hint: 'Controls how much distance is covered when scrolling.',
  });

  game.settings.register(MODULE_ID, MySettings.smoothScrollingDuration, {
    name: 'Smooth Scrolling Duration',
    default: 300,
    type: Number,
    range: {
      min: 0,
      max: 600,
      step: 50,
    },
    scope: 'client',
    config: true,
    hint: 'Controls how long smooth scrolling takes. 0 turns off smooth scrolling.',
  });
};
