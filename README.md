# nut.js (Native UI Toolkit)

<p align="center">
Please visit
</p>
<h1 align="center"><a href="https://nutjs.dev">nutjs.dev</a></h1>
<p align="center">
for detailed documentation and tutorials
</p>

<br/>

# About

<p align="center">
    <img src="https://github.com/nut-tree/nut.js/raw/master/.gfx/nut.png" alt="logo" width="200"/>
</p>

`nut.js` is a cross-platform native UI automation / testing tool.

It allows for native UI interactions via keyboard and / or mouse,
but additionally gives you the possibility to navigate the screen based on image matching.

# Demo

Check out this demo video to get a first impression of what nut.js is capable of.

[![nut.js demo video](https://img.youtube.com/vi/MpIyUJnU_Bk/1.jpg)](https://www.youtube.com/watch?v=MpIyUJnU_Bk)

# Tutorials

Please consult the project website at [nutjs.dev](https://nutjs.dev/tutorials/first_steps#prerequisites) for in-depth
tutorials

# API Docs

nut.js provides [public API documentation](https://nut-tree.github.io/apidoc/) auto-generated
by [TypeDoc](https://typedoc.org).

# Community

Feel free to join our [Discord community](https://discord.gg/U5csuM4Esp)

# Modules

This list gives an overview on currently implemented and planned functionality.
It's work in progress and will undergo constant modification.

## Clipboard

- [x] Copy text to clipboard
- [x] Paste text from clipboard

## Keyboard

- [x] Support for standard US keyboard layout
- [x] Support for multimedia keys

## Mouse

- [x] Support for mouse movement
- [x] Support for mouse scroll
- [x] Configurable movement speed
- [x] Mouse drag

## Window

- [x] List all windows
- [x] Retrieve active window
- [x] Retrieve window title
- [x] Retrieve window size and position
- [x] Focus window
- [x] Resize window
- [x] Reposition window
- [x] Minimize a window (\*)
- [x] Restore a window (\*)
- [x] Inspect GUI elements of a window (\*)
- [x] Search for specific GUI elements of a window (\*)

## Screen

- [x] Retrieve RGBA color information on screen
- [x] Highlighting screen regions
- [x] Find a single or multiple occurrences of an image on screen (requires an additional provider package like
      e.g. [nut-tree/template-matcher](https://www.npmjs.com/package/@nut-tree-fork/template-matcher))
- [x] Wait for an image to appear on screen (requires an additional provider package like
      e.g. [nut-tree/template-matcher](https://www.npmjs.com/package/@nut-tree-fork/template-matcher))
- [x] Find a single or multiple occurrences of text on screen (\*)
- [x] Wait for a piece of text to appear on screen (\*)
- [x] Find a single or multiple windows on screen (\*)
- [x] Wait for a window to appear on screen (\*)
- [x] Hooks to trigger actions based on detected text, images or windows (\*)

(\*) Requires an additional provider package, visit [nutjs.dev](https://nutjs.dev) for more info

## Integration

- [x] Jest
- [x] Electron
- [x] Custom log integration

# Sample

The following snippet shows a valid `nut.js` example (using multiple addons):

```js
"use strict";

const {
  mouse,
  screen,
  singleWord,
  sleep,
  useConsoleLogger,
  ConsoleLogLevel,
  straightTo,
  centerOf,
  Button,
  getActiveWindow,
} = require("@nut-tree-fork/nut-js");
const {
  preloadLanguages,
  Language,
  LanguageModelType,
  configure,
} = require("@nut-tree-fork/plugin-ocr");

configure({ languageModelType: LanguageModelType.BEST });

useConsoleLogger({ logLevel: ConsoleLogLevel.DEBUG });

screen.config.autoHighlight = true;
screen.config.ocrConfidence = 0.8;

function activeWindowRegion() {
  return getActiveWindow().then((activeWindow) => activeWindow.region);
}

(async () => {
  await preloadLanguages([Language.English], [LanguageModelType.BEST]);
  await sleep(5000);
  const result = await screen.find(singleWord("@nut-tree-fork/nut-js"));
  await mouse.move(straightTo(centerOf(result)));
  await mouse.click(Button.LEFT);
  await screen.waitFor(singleWord("Native"), 15000, 1000, {
    providerData: { partialMatch: true },
  });
  const content = await screen.read({ searchRegion: activeWindowRegion() });
  console.log(content);
})();
```

# Installation

## Prerequisites

This section lists runtime requirements for `nut.js` on the respective target platform.

#### Windows

In case you're running Windows 10 N and want to use [ImageFinder plugins](https://nutjs.dev/plugins/imagefinder), please
make sure to have
the [Media Feature Pack](https://support.microsoft.com/en-us/topic/media-feature-pack-for-windows-10-n-may-2020-ebbdf559-b84c-0fc2-bd51-e23c9f6a4439)
installed.

#### macOS

On macOS, Xcode command line tools are required.
You can install them by running

```bash
xcode-select --install
```

**Permissions**:

nut.js requires the executing application, e.g. your terminal, to be given both `Accessibility` and `Screen Recording`
permissions.

Starting with release `2.3.0`, nut.js will check for and request these permissions automatically:

<p align="center">
    <img src="https://github.com/nut-tree/nut.js/raw/develop/.gfx/permissions_popup.png" alt="Popup requesting screen recording permissions"/>
</p>

It will also give you a subtle hint in case permissions are lacking:

-

Accessibility: `##### WARNING! The application running this script is not a trusted process! Please visit https://github.com/nut-tree/nut.js#macos #####`

- Screen
  Recording: `##### WARNING! The application running this script is not allowed to capture screen content! Please visit https://github.com/nut-tree/nut.js#macos #####`

**Attention**:

Prior to release `2.3.0` you'll have to grant these permissions manually.

`Settings -> Security & Privacy -> Privacy tab -> Accessibility -> Add...`

For example, if you want to execute your node script in e.g. `iTerm2`, you'd have to add `iTerm.app` to the list.
When running your script from a built-in terminal in e.g. `VSCode` or `IntelliJ`, you'd have to add the respective IDE.

<p align="center">
    <img src="https://github.com/nut-tree/nut.js/raw/develop/.gfx/permissions.png" alt="accessibility permissions screen"/>
</p>

#### Linux

Depending on your distribution, Linux setups may differ.

In general, `nut.js` requires

- libXtst

Installation on `*buntu` distributions:

```bash
sudo apt-get install libxtst-dev
```

Setups on other distributions might differ.

**Attention**:

At the moment nut.js only supports X11.

Wayland is **NOT** supported!

On e.g. Ubuntu you can switch to XWayland on your login screen as a workaround.

## Install `nut.js`

```bash
npm i @nut-tree-fork/nut-js
```

or

```bash
yarn add @nut-tree-fork/nut-js
```

will install `nut.js` and its required dependencies.

## Release

To get your changes in a new release of `@nut-tree-fork/nut-js` you must:

- [libnut-core](https://github.com/ZachJW34/libnut-core) (Only required if changed)
  - Merge any required PRs for libnut-core
  - Create a version bump (increment packageJson.version) commit, create a corresponding git tag, push commit and tag to origin
  - CI will publish new versions for windows,mac and linux
  - Once published, bump all versions of [@nut-tree-fork/libnut-[darwin/linux/win32]](https://github.com/ZachJW34/nut.js/blob/733bf7d9e62522343e9c2625e3abff2078f49b77/providers/libnut/package.json#L45) in nut.js repo
  - Create Github release based on pushed git tag for libunt-core
- nut.js
  - Bump all versions of child packages (root, core/configs, core/nut.js, core/provider-interfaces, core/shared, providers/clipboardy, providers/libnut). I keep them in lockstep.
  - Run `pnpm i` (will pull in `libnut-core` changes if made)
  - Run `pnpm run compile` to verify all packages build
  - Create a corresponding git tag, create and push commit and tag to origin
  - Run `pnpm run publish:release --otp=...`, replace with 2 factor auth code for npm publishing.
  - Create Github release based on pushed git tag for nut.js
