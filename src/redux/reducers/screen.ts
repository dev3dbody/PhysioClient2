import { createReducer } from 'typesafe-actions';
import {
  navigate,
  IAction,
  createSuccess,
  edit,
  details,
  updateSuccess,
} from '../actions';

export type IScreen =
  | 'PATIENT'
  | 'ADD_PATIENT'
  | 'EDIT_PATIENT'
  | 'EDIT_APPOINTMENT'
  | 'PATIENT_DETAILS'
  | 'APPOINTMENT_DETAILS'
  | 'SCAN_DETAILS'
  | 'APPOINTMENT'
  | 'ADD_APPOINTMENT'
  | 'TREATMENT'
  | 'SCANNER';

const screen = createReducer<IScreen, IAction>('PATIENT')
  .handleAction(edit, (state, action) => {
    switch (action.payload.model) {
      case 'patients':
        return 'EDIT_PATIENT';
      case 'appointments':
        return 'EDIT_APPOINTMENT';
      default:
        return state;
    }
  })
  .handleAction(details, (_, { payload: { appointmentId, scanId } }) => {
    if (scanId !== undefined) {
      return 'SCAN_DETAILS';
    }
    if (appointmentId !== undefined) {
      return 'APPOINTMENT_DETAILS';
    }
    return 'PATIENT_DETAILS';
  })
  .handleAction(navigate, (_, action) => action.payload)
  .handleAction([createSuccess, updateSuccess], (state, action) => {
    switch (action.payload.model) {
      case 'patients':
        return 'PATIENT_DETAILS';
      case 'appointments':
        return 'APPOINTMENT_DETAILS';
      default:
        return state;
    }
  });

export default screen;
