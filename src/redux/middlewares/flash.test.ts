import { createSuccess } from "../actions";
import { addFlashMessage, removeFlashMessage } from "../actions";
import flashMiddleware from "./flash";
jest.useFakeTimers();
describe("Flash messages middleware", () => {
  it("intercepts actions with meta.flash", async () => {
    const store = { dispatch: jest.fn(), getState: jest.fn() };
    const next = jest.fn();
    const action = createSuccess(
      "patients",
      {
        _id: "1",
        _rev: "somerev",
        name: "Kowalski",
        surname: "Jan",
        birthDate: "1970-01-01",
        comment: "somecomment"
      }
    );
    await flashMiddleware(store)(next)(action);
    jest.runAllTimers();
    const expectedAddAction = addFlashMessage(
      "1",
      "success",
      "Obiekt został zapisany",
      3000
    );
    const expectedRemoveAction = removeFlashMessage("1");
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch.mock.calls[0][0]).toEqual(expectedAddAction);
    expect(store.dispatch.mock.calls[1][0]).toEqual(expectedRemoveAction);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  });
});
