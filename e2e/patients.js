import { describe, it } from "mocha";
import { exists, $, wait } from "./index";
import casual from "casual";

describe("patients", function() {
  it("top bar navigates back to patient list (after clicking somewhere else)", async () => {
    // napisać test
  });
  it("when database is empty big button opens new patient form", async () => {
    await exists("form").should.eventually.be.false;
    await $('[data-cy="new-patient-hero"]').click();
    await exists("form").should.eventually.be.true;
  });
  it("when database is populated new button next to header opens new patient form", async () => {
    await $('[data-cy="new-patient-hero"]').click();
    const fields = ["first_name", "last_name"];
    const values = {};
    for (const field of fields) {
      values[field] = casual[field];
      await $(`[data-cy="${field}"] input`).setValue(values[field]);
    }
    await $("button.positive").click();
    await wait(1);
    await $('[data-cy="back-button"]').click();
    await $('[data-cy="new-patient"]').click();
    for (const field of fields) {
      values[field] = casual[field];
      await $(`[data-cy="${field}"] input`).setValue(values[field]);
    }
    await $("button.positive").click();
    await wait(1);
    await $('[data-cy="back-button"]').click();
    await $('[data-cy="new-patient"]').click();
    await exists("form").should.eventually.be.true;
  });
  describe("new / edit form", () => {
    it("adds new patient and redirects to patient details with correct patient information", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      // field names stored in data-cy are same as casual function names on purpose
      const fields = ["first_name", "last_name", "description"];
      const values = {};
      // storing field values and setting inputs
      for (const field of fields) {
        values[field] = casual[field];
        // Form.Input produces div with input inside
        await $(`[data-cy="${field}"] input`).setValue(values[field]);
      }
      // wait optionally to visually check if form is filled ok
      // await wait(5);

      await $("button.positive").click();

      await $("div.sub.header")
        .getText()
        .should.eventually.equal("Szczegóły Pacjenta");
      await $("h2")
        .getText()
        .should.eventually.equal(
          `${values.first_name} ${values.last_name}\nSzczegóły Pacjenta`
        );

      // TODO: check if other patient detail values are matching stored values when page is ready
    });
    it("doesn't add new patient on form cancel", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      await exists("form").should.eventually.be.true;
      await $('[data-cy="cancel-button"]').click();
      await exists("form").should.eventually.be.false;
      await exists('[data-cy="new-patient-hero"]').should.eventually.be.true;
    });
    it("shows validation errors", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      await exists("form").should.eventually.be.true;
    });
    it.only("doesn't edit patient record on form cancel", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      const fields = ["first_name", "last_name"];
      const values = {};
      for (const field of fields) {
        values[field] = casual[field];
        await $(`[data-cy="${field}"] input`).setValue(values[field]);
      }
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await $('[data-cy="dropdown-button-icon"]').click();
      await wait(1);
      // poddałam się tu, nie wiem co oznaczam nie tak
    });
  });
  describe("patient details", () => {
    it(
      "modifies patient record visible on patient details and on patient list"
    );
    it(
      "removes patient record and redirects back to patient list without removed record"
    );
  });
});
