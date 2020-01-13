import { createReducer } from 'typesafe-actions';
import union from 'lodash/union';
import without from 'lodash/without';
import {
  compareRemove,
  compareAdd,
  compareClear, IAction
} from '../actions';

export type IScanComparsion = string[]

const reducer = createReducer<IScanComparsion, IAction>([])
  .handleAction(compareAdd, (state, action) => union(state, [action.payload.id]))
  .handleAction(compareRemove, (state, action) => without(state, action.payload.id) as string[])
  .handleAction(compareClear, () => [])

export default reducer;
