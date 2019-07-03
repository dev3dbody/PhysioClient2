import { beforeAll, describe, it } from "mocha";
import { Application } from "spectron";
import chai from "chai";

chai.should();

describe("e2e tests", () => {
  let app;
  beforeAll(async () => {
    app = new Application({
      path: "/Applications/MyApp.app/Contents/MacOS/MyApp"
    });
    await app.start();
  });
  it("window is visible", () => {
    app.browserWindow.isVisible().should.be.true();
  });
});
