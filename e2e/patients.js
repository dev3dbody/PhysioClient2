import { describe, it } from "mocha";
import { exists, $, wait } from "./index";
import casual from "casual";

describe("patients", function() {
  it("top bar navigates back to patient list (after clicking somwhere else)");
  it("when database is empty big button opens new patient form", async () => {
    await exists("form").should.eventually.be.false;
    await $('[data-cy="new-patient-hero"]').click();
    await exists("form").should.eventually.be.true;
  });
  it(
    "when database is populated new button next to header open new patient form"
  );
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
    it("doesn't add new patient on form cancel");
    it("shows validation errors");
    it("doesn't edit patient record on form cancel");
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
