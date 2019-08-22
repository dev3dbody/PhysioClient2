import { describe, it } from "mocha";
import casual from "casual";
import { exists, $, wait } from "./index";

describe("appointments", () => {
  it.only("top bar navigates back to appointments list (after clicking somewhere else)", async () => {
    await $('[data-cy="top-navigation-PATIENT"]').click();
    await exists('[data-cy="new-patient-hero"]').should.eventually.be.false;
    await $('[data-cy="top-navigation-APPOINTMENT"]').click();
    await exists('[data-cy="new-patient-hero"]').should.eventually.be.true;
  });
  it("shows 'There`s no visit yet' statement when new patient's added", async () => {
    await $('[data-cy="new-patient-hero"]').click();
    const fields = ["first_name", "last_name", "description"];
    const values = {};

    for (const field of fields) {
      values[field] = casual[field];
      if (field === "description") {
        await $(`[data-cy="${field}"]`).setValue(values[field]);
      } else {
        await $(`[data-cy="${field}"] input`).setValue(values[field]);
      }
    }
    await $("button.positive").click();
    await wait(1);
    await exists('[data-cy="no-visit-yet-statement"]').should.eventually.be
      .true;
  });
  it("adds new visit and displays it in Patient's Details - Last Visits", async () => {
    await $('[data-cy="new-patient-hero"]').click();
    const fields = ["first_name", "last_name", "description"];
    const values = {};

    for (const field of fields) {
      values[field] = casual[field];
      if (field === "description") {
        await $(`[data-cy="${field}"]`).setValue(values[field]);
      } else {
        await $(`[data-cy="${field}"] input`).setValue(values[field]);
      }
    }
    await $("button.positive").click();
    await wait(1);
    await $('[data-cy="new-visit-button"]').click();
    await wait(1);
  });
});
