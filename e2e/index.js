import PouchDb from "pouchdb";
import { beforeEach, describe, afterEach } from "mocha";
import { Application } from "spectron";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

require("@babel/polyfill");

chai.should();
chai.use(chaiAsPromised);
let $;
let $$;
let client;

describe("e2e tests", function() {
  this.timeout(10000);

  beforeEach(function() {
    this.app = new Application({
      chromeDriverArgs: process.env.CI
        ? [
            "--whitelisted-ips",
            "--headless",
            "--no-sandbox",
            "--disable-extensions"
          ]
        : null,
      path:
        process.platform === "darwin"
          ? "./dist/mac/Physio Client 2.app/Contents/MacOS/Physio Client 2"
          : "./dist/linux-unpacked/physioclient2"
    });
    return this.app.start();
  });

  beforeEach(function() {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
    return this.app.client
      .waitUntilWindowLoaded()
      .getWindowCount()
      .should.eventually.have.at.least(1)
      .browserWindow.isMinimized()
      .should.eventually.be.false.browserWindow.isVisible()
      .should.eventually.be.true.browserWindow.isFocused()
      .should.eventually.be.true.browserWindow.getBounds()
      .should.eventually.have.property("width")
      .and.be.above(0)
      .browserWindow.getBounds()
      .should.eventually.have.property("height")
      .and.be.above(0);
  });

  beforeEach(function(done) {
    this.app.client.waitUntilWindowLoaded().then(() => {
      client = this.app.client;
      $ = selector => this.app.client.$.apply(client, [selector]);
      $$ = async selector => this.app.client.$$.apply(client, [selector]);
      done();
    });
  });

  beforeEach(async function() {
    await Promise.all([
      new PouchDb("patients").destroy(),
      new PouchDb("appointments").destroy(),
      new PouchDb("scans").destroy()
    ]);
    this.app.browserWindow.reload();
    await this.app.client.waitUntilWindowLoaded();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
    return null;
  });

  require("./patients");
});

const exists = async selector => {
  try {
    return (await $(selector)).state !== "failure";
  } catch (e) {
    console.info({ e });
    return false;
  }
};

const wait = delayInSeconds =>
  new Promise(resolve => setTimeout(resolve, delayInSeconds * 1000));

export { $, $$, exists, wait };
