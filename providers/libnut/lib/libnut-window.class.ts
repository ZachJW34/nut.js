import { libnut } from "../import_libnut";
import { Point, Region, Size } from "@nut-tree-fork/shared";
import { WindowProviderInterface } from "@nut-tree-fork/provider-interfaces";

export default class WindowAction implements WindowProviderInterface {
  public getWindows(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      try {
        resolve(libnut.getWindows());
      } catch (e) {
        reject(e);
      }
    });
  }

  getActiveWindow(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      try {
        resolve(libnut.getActiveWindow());
      } catch (e) {
        reject(e);
      }
    });
  }

  getWindowRegion(windowHandle: number): Promise<Region> {
    return new Promise<Region>((resolve, reject) => {
      try {
        const windowRect = libnut.getWindowRect(windowHandle);
        resolve(
          new Region(
            windowRect.x,
            windowRect.y,
            windowRect.width,
            windowRect.height
          )
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  getWindowTitle(windowHandle: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        resolve(libnut.getWindowTitle(windowHandle));
      } catch (e) {
        reject(e);
      }
    });
  }

  focusWindow(windowHandle: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(libnut.focusWindow(windowHandle));
      } catch (e) {
        reject(e);
      }
    });
  }

  moveWindow(windowHandle: number, newOrigin: Point): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(libnut.moveWindow(windowHandle, newOrigin));
      } catch (e) {
        reject(e);
      }
    });
  }

  resizeWindow(windowHandle: number, newSize: Size): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(libnut.resizeWindow(windowHandle, newSize));
      } catch (e) {
        reject(e);
      }
    });
  }

  minimizeWindow(_: number): Promise<boolean> {
    throw new Error("Method not implemented in libnut.");
  }

  restoreWindow(_: number): Promise<boolean> {
    throw new Error("Method not implemented in libnut.");
  }
}
