import { addFlashMessage, removeFlashMessage } from "../actions/flash";
import flash, { IFlash } from "./flash";
import { IAction } from "../actions";

describe("flash reducer", () => {
  it("adds correct message", () => {
    const initState:IFlash[] = [];
    // @ts-ignore
    const action: IAction = addFlashMessage(
      "1",
      "info",
      "Sample Info Flash Message",
      4000
    );
    // @ts-ignore
    const newState = flash(initState, action);
    expect(newState).toEqual([
      {
        id: "1",
        type: "info",
        text: "Sample Info Flash Message"
      }
    ]);
  });

  it("removes specific message", () => {
    const initState:IFlash[] = [
      {
        id: "1",
        type: "info",
        text: "Sample Info Flash Message"
      }
    ];
    const action = removeFlashMessage("1");
    // @ts-ignore
    const newState = flash(initState, action);
    expect(newState).toEqual([]);
  });
});
