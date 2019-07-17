import { createReducer } from 'typesafe-actions';
import {
  IAction,
  listSuccess,
  createSuccess,
  updateSuccess,
  removeSuccess,
} from '../actions';

export type IModel = 'patients' | 'appointments' | 'scans';

export interface IData {
  patients: IPatient[];
  appointments: IAppointment[];
  scans: IScan[];
}

interface IPatient {
  _id: string;
  _rev: string;
  name: string;
  surname: string;
  birthDate: string;
  comment: string;
}

interface IAppointment {
  _id: string;
  _rev: string;
  visitDate: string;
  interview: string;
  patientId: string;
}

interface IScan {
  _id: string;
  _rev: string;
  order: number;
  mesh: string;
  appointmentId: string;
}

export type IResource = IPatient | IAppointment | IScan;

export type INewPatient = Omit<IPatient, '_id' | '_rev'>;
export type INewAppointment = Omit<IAppointment, '_id' | '_rev'>;
type INewScan = Omit<IScan, '_id' | '_rev'>;

export type INewResource = INewPatient | INewAppointment | INewScan;

const initData = {
  patients: [],
  appointments: [],
  scans: [],
};

const data = createReducer<IData, IAction>(initData)
  .handleAction(listSuccess, (state, action) => ({
    ...state,
    [action.payload.model]: action.payload.data,
  }))
  .handleAction(createSuccess, (state, action) => ({
    ...state,
    [action.payload.model]: [
      ...state[action.payload.model],
      action.payload.resource,
    ],
  }))
  .handleAction(updateSuccess, (state, action) => ({
    ...state,
    [action.payload.model]: [
      ...(state[action.payload.model] as IResource[]).filter(
        ({ _id }) => _id !== action.payload.resource._id,
      ),
      action.payload.resource,
    ],
  }))
  .handleAction(removeSuccess, (state, action) => ({
    ...state,
    [action.payload.model]: (state[action.payload.model] as IResource[]).filter(
      ({ _id }) => _id !== action.payload.id,
    ),
  }));

export default data;

export const getPatients = (state: IData) => state.patients;
export const getPatientById = (state: IData, id: string) =>
  state.patients.find(({ _id }) => _id === id);
export const getPatientsCount = (state: IData) => getPatients(state).length;
export const getAppointments = (state: IData) => state.appointments;
export const getAppointmentById = (state: IData, id: string) =>
  state.appointments.find(({ _id }) => _id === id);
export const getAppointmentsCount = (state: IData) =>
  getAppointments(state).length;
export const getScans = (state: IData) => state.scans;
export const getScansCount = (state: IData) => getScans(state).length;
export const getScanById = (state: IData, id: string) =>
  state.scans.find(({ _id }) => _id === id);
