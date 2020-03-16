import { createReducer } from 'typesafe-actions';
import {
  IAction,
  listRequest,
  createRequest,
  updateRequest,
  removeRequest,
  updateSuccess,
  removeSuccess,
  listSuccess,
  listFailure,
  createSuccess,
  createFailure,
  updateFailure,
  removeFailure,
} from '../actions';

export interface ILoading {
  patients: boolean;
  appointments: boolean;
  scans: boolean;
}

export const initLoading = {
  patients: false,
  appointments: false,
  scans: false,
};

const loading = createReducer<ILoading, IAction>(initLoading)
  .handleAction(
    [
      listSuccess,
      listFailure,
      createSuccess,
      createFailure,
      updateSuccess,
      updateFailure,
      removeSuccess,
      removeFailure,
    ],
    (state, action) => ({
      ...state,
      [action.payload.model]: false,
    }),
  )
  .handleAction(
    [listRequest, createRequest, updateRequest, removeRequest],
    (state, action) => ({
      ...state,
      [action.payload.model]: true,
    }),
  );

export default loading;

export const getPatientsLoading = (state: ILoading) => state.patients;
export const getAppointmentsLoading = (state: ILoading) => state.appointments;
export const getScansLoading = (state: ILoading) => state.scans;
