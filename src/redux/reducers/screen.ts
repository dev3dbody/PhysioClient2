import { createReducer } from 'typesafe-actions';
import { navigate, IAction, createSuccess, edit, details, updateSuccess } from '../actions';

export type IScreen =
  | 'PATIENT'
  | 'ADD_PATIENT'
  | 'EDIT_PATIENT'
  | 'PATIENT_DETAILS'
  | 'APPOINTMENT'
  | 'ADD_APPOINTMENT'
  | 'TREATMENT'
  | 'SCANNER';

const screen = createReducer<IScreen, IAction>('PATIENT')
  .handleAction(navigate, (_, action) => action.payload)
  .handleAction([createSuccess, updateSuccess], (state, action) =>
    action.payload.model === 'patients' ? 'PATIENT_DETAILS' : state,
  )
  .handleAction(edit, (state, action) =>
    action.payload.model === 'patients' ? 'EDIT_PATIENT' : state,
  ).handleAction(details, (state, action) =>
    action.payload.model === 'patients' ? 'PATIENT_DETAILS' : state,
  );
export default screen;
