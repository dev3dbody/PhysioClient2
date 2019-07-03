require("@babel/polyfill");

import { beforeEach, afterEach, describe, it } from "mocha";
import { Application } from "spectron";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

describe("e2e tests", function() {
  this.timeout(10000);

  beforeEach(function() {
    this.app = new Application({
      path: "./dist/mac/Physio Client 2.app/Contents/MacOS/Physio Client 2"
    });
    return this.app.start();
  });

  beforeEach(function() {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("opens app window", function() {
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

  require("./navigation");
});
