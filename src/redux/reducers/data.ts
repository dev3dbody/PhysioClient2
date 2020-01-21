import { createReducer } from 'typesafe-actions';
import {
  createSuccess,
  IAction,
  listSuccess,
  removeSuccess,
  updateSuccess,
} from '../actions';

export type IModel = 'patients' | 'appointments' | 'scans';

export interface IData {
  patients: { allIds: string[]; byId: { [index: string]: IPatient } };
  appointments: { allIds: string[]; byId: { [index: string]: IAppointment } };
  scans: { allIds: string[]; byId: { [index: string]: IScan } };
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
  patientId: string;
  date: string;
  comment: string;
}

export type IResource = IPatient | IAppointment | IScan;

export type INewPatient = Omit<IPatient, '_id' | '_rev'>;
export type INewAppointment = Omit<IAppointment, '_id' | '_rev'>;
export type INewScan = Omit<IScan, '_id' | '_rev'>;

export type INewResource = INewPatient | INewAppointment | INewScan;

const initData = {
  patients: { byId: {}, allIds: [] },
  appointments: { byId: {}, allIds: [] },
  scans: { byId: {}, allIds: [] },
};

const data = createReducer<IData, IAction>(initData)
// eslint-disable-next-line no-shadow
  .handleAction(listSuccess, (state, { payload: { model, data } }) => ({
    ...state,
    [model]: {
      allIds: data.map(({ _id }) => _id),
      byId: data.reduce(
        (result, current) => ({ ...result, [current._id]: current }),
        {}
      ),
    },
  }))
  .handleAction(createSuccess, (state, { payload: { model, resource } }) => ({
    ...state,
    [model]: {
      allIds: [...state[model].allIds, resource._id],
      byId: {
        ...state[model].byId,
        [resource._id]: resource,
      },
    },
  }))
  .handleAction(updateSuccess, (state, { payload: { model, resource } }) => ({
    ...state,
    [model]: {
      ...state[model],
      byId: {
        ...state[model].byId,
        [resource._id]: resource,
      },
    },
  }))
  .handleAction(removeSuccess, (state, { payload: { id, model } }) => {
    const { [id]: omitVar, ...byId } = state[model].byId;
    return {
      ...state,
      [model]: {
        allIds: state[model].allIds.filter(currId => currId !== id),
        byId,
      },
    };
  });

export default data;

export const getPatients = (state: IData) =>
  state.patients.allIds.map(id => state.patients.byId[id]);
export const getPatientById = (state: IData, id: string) =>
  state.patients.byId[id];
export const getPatientsCount = (state: IData) => state.patients.allIds.length;
export const getAppointments = (state: IData) =>
  state.appointments.allIds.map(id => state.appointments.byId[id]);
export const getAppointmentById = (state: IData, id: string) =>
  state.appointments.byId[id];
export const getAppointmentsCount = (state: IData) =>
  state.appointments.allIds.length;
export const getScans = (state: IData) =>
  state.scans.allIds.map(id => state.scans.byId[id]);
export const getScansCount = (state: IData) => state.scans.allIds.length;
export const getScanById = (state: IData, id: string) => state.scans.byId[id];

export const getAppointmentsWithPatients = (state: IData) => {
  return getAppointments(state).map(appointment => ({
    ...appointment,
    patient: getPatientById(state, appointment.patientId),
  }));
};
