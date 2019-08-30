import { describe, it } from "mocha";
import casual from "casual";
import { exists, $, wait } from "./index";

describe("patients", () => {
  it("top bar navigates back to patient list (after clicking somewhere else)", async () => {
    await $('[data-cy="top-navigation-APPOINTMENT"]').click();
    await exists('[data-cy="new-patient-hero"]').should.eventually.be.false;
    await $('[data-cy="top-navigation-PATIENT"]').click();
    await exists('[data-cy="new-patient-hero"]').should.eventually.be.true;
  });
  it("when database is empty big button opens new patient form", async () => {
    await $('[data-cy="new-patient-hero"]').click();
    await exists("form").should.eventually.be.true;
  });
  it("when database is populated new button next to header opens new patient form", async () => {
    await $('[data-cy="new-patient-hero"]').click();
    const fields = ["first_name", "last_name"];
    const values = {};
    // eslint-disable-next-line no-restricted-syntax
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
        if (field === "description") {
          await $(`[data-cy="${field}"]`).setValue(values[field]);
        } else {
          // Form.Input produces div with input inside
          await $(`[data-cy="${field}"] input`).setValue(values[field]);
        }
      }
      // wait optionally to visually check if form is filled ok
      // await wait(5);
      await $("button.positive").click();
      await wait(1);
      await $('[data-cy="patient-header-content"]')
        .getText()
        .should.eventually.equal(
          `${values.first_name} ${values.last_name}\nSzczegóły Pacjenta`
        );
      // TODO: check if other patient detail values are matching stored values when page is ready
    });
    it("doesn't add new patient on form cancel", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      await exists("form").should.eventually.be.true;
      await $('[data-cy="patient-cancel-button"]').click();
      await exists("form").should.eventually.be.false;
      await exists('[data-cy="new-patient-hero"]').should.eventually.be.true;
    });
    it("shows validation errors", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      const name1 = casual.first_name;
      await exists("form").should.eventually.be.true;
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await exists('[data-cy="validation-error-message"]').should.eventually.be
        .true;
      await $(`[data-cy="first_name"] input`).setValue(name1);
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await exists('[data-cy="validation-error-message"]').should.eventually.be
        .true;
    });
    it("doesn't edit patient record on form cancel", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      const name1 = casual.first_name;
      const name2 = casual.first_name;
      const surname1 = casual.last_name;
      const surname2 = casual.last_name;
      const ribbon = surname1[0].toUpperCase();

      await $(`[data-cy="first_name"] input`).setValue(name1);
      await $(`[data-cy="last_name"] input`).setValue(surname1);
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await $('[data-cy="dropdown-button-icon"]').click();
      await wait(1);
      await $("div.visible.menu.transition").click();
      await wait(1);
      await $(`[data-cy="first_name"] input`).setValue(name2);
      await $(`[data-cy="last_name"] input`).setValue(surname2);
      await wait(1);
      await $('[data-cy="patient-cancel-button"]').click();
      await wait(1);
      await $('[data-cy="data-name-cell"]')
        .getText()
        .should.eventually.equal(`${ribbon}${name1} ${surname1}`);
    });
  });
  describe("patient details", () => {
    it("modifies patient record visible on patient details and on patient list", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      const name1 = casual.first_name;
      const surname1 = casual.last_name;
      const surname2 = casual.last_name;
      const ribbon = surname2[0].toUpperCase();

      await $(`[data-cy="first_name"] input`).setValue(name1);
      await $(`[data-cy="last_name"] input`).setValue(surname1);
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await $('[data-cy="dropdown-button-icon"]').click();
      await wait(1);
      await $("div.visible.menu.transition").click();
      await wait(1);
      await $(`[data-cy="last_name"] input`).setValue(surname2);
      await wait(1);
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await $('[data-cy="back-button"]').click();
      await wait(1);
      await $('[data-cy="data-name-cell"]')
        .getText()
        .should.eventually.equal(`${ribbon}${name1} ${surname2}`);
    });
    it("removes patient record and redirects back to patient list without removed record", async () => {
      await $('[data-cy="new-patient-hero"]').click();
      const name1 = casual.first_name;
      const name2 = casual.first_name;
      const surname1 = casual.last_name;
      const surname2 = casual.last_name;
      const ribbon = surname2[0].toUpperCase();

      await $(`[data-cy="first_name"] input`).setValue(name1);
      await $(`[data-cy="last_name"] input`).setValue(surname1);
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await $(`[data-cy="back-button"]`).click();
      await wait(1);
      await $('[data-cy="new-patient"]').click();
      await $(`[data-cy="first_name"] input`).setValue(name2);
      await $(`[data-cy="last_name"] input`).setValue(surname2);
      await $('[data-cy="patient-save-button"]').click();
      await wait(1);
      await $('[data-cy="back-button"]').click();
      await wait(1);
      await $(`[data-cy="data-name-cell"]`)
        .then(`${name1} ${surname1}`)
        .click();
      await wait(1);
      await $('[data-cy="dropdown-button-icon"]').click();
      await $("div.visible.menu.transition").click();
      await $('[data-cy="patient-delete-button"]').click();
      await wait(1);
      await $('[data-cy="data-name-cell"]')
        .getText()
        .should.eventually.equal(`${ribbon}${name2} ${surname2}`);
    });
  });
});

describe("appointments", () => {
  it("top bar navigates back to appointments list (after clicking somewhere else)", async () => {
    await $('[data-cy="top-navigation-PATIENT"]').click();
    await wait(1);
    await exists('[data-cy="new-patient-hero"]').should.eventually.be.true;
    await $('[data-cy="top-navigation-APPOINTMENT"]').click();
    await exists('[data-cy="new-patient-hero"]').should.eventually.be.false;
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
  it.only("adds new visit and displays it in Patient's Details - Last Visits", async () => {
    await $('[data-cy="new-patient-hero"]').click();
    const fields = ["first_name", "last_name", "description"];
    const values = {};
    const visit = casual.sentence;

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
    await $('[data-cy="description"]').setValue(visit);
    await $('[data-cy="visit-save-button"]').click();
    await wait(1);
    await $("[data-cy=visit-subheader-content]")
      .getText()
      .should.eventually.equal(`${values.first_name} ${values.last_name}`);
    await wait(1);
    await $('[data-cy="visit-description"]').should.eventually.equal(
      `${visit}`
    );
  });
});
