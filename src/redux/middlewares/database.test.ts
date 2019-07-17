import fakePouch, {
  samplePatients,
  newPatient,
  updatePatient,
  mockAllDocs,
  mockPost,
  mockPut,
  mockRemove
} from "./__mocks__/pouchdb";

import {
  listRequest,
  listSuccess,
  createRequest,
  createSuccess,
  updateRequest,
  updateSuccess,
  removeRequest,
  removeSuccess,
  listFailure
} from "../actions";

import databaseMiddleware from "./database";

describe("PouchDb middleware", () => {
  const store = { dispatch: jest.fn(), getState: jest.fn() };
  const next = jest.fn();
  beforeEach(() => {
    jest.mock("pouchdb");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("with db connection", () => {
    it("intercepts list action", async () => {
      const action = listRequest("patients");
      await databaseMiddleware(store)(next)(action);
      expect(mockAllDocs).toHaveBeenCalledTimes(1);
      expect(mockAllDocs).toHaveBeenCalledWith({
        include_docs: true,
        attachments: false
      });
      const expectedAction = listSuccess("patients", samplePatients);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });
    it("intercepts create action", async () => {
      const { id, rev, ...justNewPatient } = newPatient;
      const action = createRequest("patients", justNewPatient);
      await databaseMiddleware(store)(next)(action);
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(justNewPatient);
      const expectedAction = createSuccess(
        "patients",
        { ...justNewPatient, _id: id, _rev: rev }
      );
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });
    it("intercepts update action", async () => {
      const action = updateRequest("patients", updatePatient);
      await databaseMiddleware(store)(next)(action);
      expect(mockPut).toHaveBeenCalledTimes(1);
      expect(mockPut).toHaveBeenCalledWith(updatePatient);
      const expectedAction = updateSuccess(
        "patients",
        { ...updatePatient, _rev: 7777 },
      );
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });

    it("intercepts remove action", async () => {
      const action = removeRequest("patients", updatePatient);
      await databaseMiddleware(store)(next)(action);
      expect(mockRemove).toHaveBeenCalledTimes(1);
      expect(mockRemove).toHaveBeenCalledWith(updatePatient);
      const expectedAction = removeSuccess("patients", "2");
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });
  });
  describe.skip("db connection error", () => {
    // can't get mockImplementationOnce to work
    beforeEach(() => {
      jest.clearAllMocks();
      fakePouch.mockImplementationOnce(() => {
        return {
          allDocs: jest
            .fn()
            .mockRejectedValue(new Error("Nie mów im, że keks się kończy."))
        };
      });
    });
    it("intercepts list action (db error)", async () => {
      const action = listRequest("patients");
      await databaseMiddleware(store)(next)(action);
      expect(mockAllDocs).toHaveBeenCalledTimes(1);
      expect(mockAllDocs).toHaveBeenCalledWith({
        include_docs: true,
        attachments: false
      });
      const expectedAction = listFailure("patients", new Error("Nie mów im, że keks się kończy."));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0]).toEqual(expectedAction);
    });
  });
});
