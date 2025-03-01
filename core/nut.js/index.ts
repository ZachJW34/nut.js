import { AssertClass } from "./lib/assert.class";
import { ClipboardClass } from "./lib/clipboard.class";
import { KeyboardClass, KeyboardConfig } from "./lib/keyboard.class";
import { MouseClass, MouseConfig } from "./lib/mouse.class";
import { createMovementApi } from "./lib/movement.function";
import { ScreenClass, ScreenConfig } from "./lib/screen.class";
import { LineHelper } from "./lib/util/linehelper.class";
import { createWindowApi } from "./lib/window.function";
import providerRegistry from "./lib/provider/provider-registry.class";
import { loadImageResource } from "./lib/imageResources.function";
import {
  ColorQuery,
  LineQuery,
  RGBA,
  WindowQuery,
  WordQuery
} from "@nut-tree-fork/shared";

export {
  AssertClass,
  ClipboardClass,
  KeyboardClass,
  KeyboardConfig,
  MouseClass,
  MouseConfig,
  ScreenClass,
  ScreenConfig,
  providerRegistry
};

export { MatchRequest } from "@nut-tree-fork/shared";
export { MatchResult } from "@nut-tree-fork/shared";
export * from "@nut-tree-fork/provider-interfaces";
export * from "@nut-tree-fork/shared";

export { jestMatchers } from "./lib/expect/jest.matcher.function";
export { sleep } from "./lib/sleep.function";
export { centerOf, randomPointIn } from "./lib/location.function";
export { EasingFunction, linear } from "./lib/mouse-movement.function";
export { Window } from "./lib/window.class";
export {
  useLogger,
  useConsoleLogger,
  ConsoleLogLevel
} from "./lib/logging.function";

const lineHelper = new LineHelper();

const clipboard = new ClipboardClass(providerRegistry);
const keyboard = new KeyboardClass(providerRegistry);
const mouse = new MouseClass(providerRegistry);
const screen = new ScreenClass(providerRegistry);
const assert = new AssertClass(screen);

const { straightTo, up, down, left, right } = createMovementApi(
  providerRegistry,
  lineHelper
);
const { getWindows, getActiveWindow } = createWindowApi(providerRegistry);

const loadImage = providerRegistry.getImageReader().load;
const saveImage = providerRegistry.getImageWriter().store;

const imageResource = (fileName: string) =>
  loadImageResource(
    providerRegistry,
    screen.config.resourceDirectory,
    fileName
  );

const singleWord = (word: string): WordQuery => {
  return {
    type: "text",
    id: `word-query-${word}`,
    by: {
      word
    }
  };
};
const textLine = (line: string): LineQuery => {
  return {
    type: "text",
    id: `line-query-${line}`,
    by: {
      line
    }
  };
};

const windowWithTitle = (title: string | RegExp): WindowQuery => {
  return {
    type: "window",
    id: `window-by-title-query-${title}`,
    by: {
      title
    }
  };
};

const pixelWithColor = (color: RGBA): ColorQuery => {
  return {
    type: "color",
    id: `pixel-by-color-query-RGBA(${color.R},${color.G},${color.B},${color.A})`,
    by: {
      color
    }
  };
};

export { fetchFromUrl } from "./lib/imageResources.function";

export {
  clipboard,
  keyboard,
  mouse,
  screen,
  assert,
  straightTo,
  up,
  down,
  left,
  right,
  getWindows,
  getActiveWindow,
  loadImage,
  saveImage,
  imageResource,
  singleWord,
  textLine,
  windowWithTitle,
  pixelWithColor
};
