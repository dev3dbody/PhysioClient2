import { isActionOf } from 'typesafe-actions';

import {
  IAction,
  addFlashMessage,
  removeFlashMessage,
  IFlashType,
} from '../actions';

export interface IFlash {
  id: string;
  type: IFlashType;
  text: string;
  duration?: number;
}

const initialState: IFlash[] = [];

const flash = (state = initialState, action: IAction) => {
  if (isActionOf(addFlashMessage, action)) {
    return [...state, action.payload];
  }

  if (isActionOf(removeFlashMessage, action)) {
    return state.filter(({ id }) => id !== action.payload.id);
  }

  return state;
};

export default flash;
