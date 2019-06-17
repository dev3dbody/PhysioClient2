import { createReducer } from 'typesafe-actions';
import { navigate, IAction, createSuccess, edit, updateSuccess } from '../actions';

export type IScreen =
  | 'MAIN'
  | 'PATIENT'
  | 'ADD_PATIENT'
  | 'EDIT_PATIENT'
  | 'APPOINTMENT'
  | 'ADD_APPOINTMENT'
  | 'TREATMENT'
  | 'SCANNER';

const screen = createReducer<IScreen, IAction>('MAIN')
  .handleAction(navigate, (_, action) => action.payload)
  .handleAction([createSuccess, updateSuccess], (state, action) =>
    action.payload.model === 'patients' ? 'PATIENT' : state,
  )
  .handleAction(edit, (state, action) =>
    action.payload.model === 'patients' ? 'EDIT_PATIENT' : state,
  );
export default screen;
