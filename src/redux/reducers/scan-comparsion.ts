import { createReducer } from 'typesafe-actions';
import union from 'lodash/union';
import without from 'lodash/without';
import {
  compareRemove,
  compareAdd,
  compareClear, IAction
} from '../actions';

export type IScanComparsion = string[]

const reducer = createReducer<IScanComparsion, IAction>([
  "e201c7c4-fa2d-4071-b8d9-654f06d759f1", "993b8982-fd1f-4514-8a14-40cf1089b7d2"
])
  .handleAction(compareAdd, (state, action) => union(state, [action.payload.id]))
  .handleAction(compareRemove, (state, action) => without(state, action.payload.id) as string[])
  .handleAction(compareClear, () => [])

export default reducer;
