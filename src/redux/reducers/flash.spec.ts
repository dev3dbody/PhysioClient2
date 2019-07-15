import { addFlashMessage, removeFlashMessage } from "../actions";
import flash, { IFlash } from "./flash";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import casual from 'casual';

chai.should();
chai.use(chaiAsPromised);

describe("flash reducer", () => {
  it("adds correct message", () => {
    const sentence = casual.sentence;
    const initState:IFlash[] = [];
    const action = addFlashMessage(
      "1",
      "info",
      sentence,
      3000,
    );
    const newState = flash(initState, action);
    newState.should.deep.equal([{
      duration: 3000,
      id: "1",
      type: "info",
      text: sentence
    }]);
  });

  it("removes specific message", () => {
    const initState:IFlash[] = [
      {
        id: "1",
        type: "info",
        text: casual.sentence
      },
      {
        id: "2",
        type: "error",
        text: casual.sentence
      },
      {
        id: "3",
        type: "success",
        text: casual.sentence
      },
    ];
    const action = removeFlashMessage("2");
    const newState = flash(initState, action);
    newState.should.have.lengthOf(2);
    newState[0].should.deep.equal(initState[0]);
    newState[1].should.deep.equal(initState[2]);
  });
});
