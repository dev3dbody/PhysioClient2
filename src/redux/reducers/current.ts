import { createReducer } from 'typesafe-actions';
import { IAction, edit, details, navigate, createSuccess, updateSuccess } from "../actions";

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
  navigate,
  (state, action) => {
    switch (action.payload) {
      case 'ADD_PATIENT':
        return ({ ...state, patients: undefined});
      case 'ADD_APPOINTMENT':
        return ({ ...state, appointments: undefined});
    }
    return ({ ...state })
  }
).handleAction(
  edit,
  (state, action) => ({ ...state, [action.payload.model]: action.payload.id }),
).handleAction(
  details,
  (state, action) => ({ ...state, [action.payload.model]: action.payload.id }),
).handleAction(
  createSuccess,
  (state, action) => ({ ...state, [action.payload.model]: action.payload.resource._id })
).handleAction(
  updateSuccess,
  (state, action) => ({ ...state, [action.payload.model]: action.payload.resource._id })
);

export default current;

export const getPatientsCurrent = (state: ICurrent) => state.patients;
export const getAppointmentsCurrent = (state: ICurrent) => state.appointments;
export const getScansCurrent = (state: ICurrent) => state.scans;
