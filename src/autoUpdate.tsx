import { autoUpdater } from "electron-updater";

export default class AppUpdater {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const log = require("electron-log");
    log.transports.file.level = "debug";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
