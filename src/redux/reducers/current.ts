import { createReducer } from 'typesafe-actions';
import { IAction, edit, details } from '../actions';

export interface ICurrent {
  patients: string | undefined;
  appointments: string | undefined;
  scans: string | undefined;
}

const initCurrent = {
  patients: undefined,
  appointments: undefined,
  scans: undefined,
};

const current = createReducer<ICurrent, IAction>(initCurrent).handleAction(
  edit,
  (state, action) => ({ ...state, [action.payload.model]: action.payload.id }),
).handleAction(
  details,
  (state, action) => ({ ...state, [action.payload.model]: action.payload.id }),
);

export default current;

export const getPatientsCurrent = (state: ICurrent) => state.patients;
export const getAppointmentsCurrent = (state: ICurrent) => state.appointments;
export const getScansCurrent = (state: ICurrent) => state.scans;
