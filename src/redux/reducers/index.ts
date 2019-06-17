import { combineReducers } from 'redux';
import screen, { IScreen } from './screen';
import * as fromData from './data';
import data, { IData } from './data';
import * as fromLoading from './loading';
import loading, { ILoading } from './loading';
import * as fromCurrent from './current';
import current, { ICurrent } from './current';

export interface IState {
  screen: IScreen;
  data: IData;
  loading: ILoading;
  current: ICurrent;
}

const reducer = combineReducers({ screen, data, loading, current });
export default reducer;

export const getScreen = (state: IState) => state.screen;

export const getData = (state: IState) => state.data;
export const getPatients = (state: IState) => fromData.getPatients(state.data);
export const getPatientById = (state: IState, id: string) =>
  fromData.getPatientById(state.data, id);
export const getPatientsCount = (state: IState) =>
  fromData.getPatientsCount(state.data);
export const getAppointments = (state: IState) =>
  fromData.getAppointments(state.data);
export const getAppointmentById = (state: IState, id: string) =>
  fromData.getAppointmentById(state.data, id);
export const getAppointmentsCount = (state: IState) =>
  fromData.getAppointmentsCount(state.data);
export const getScans = (state: IState) => fromData.getScans(state.data);
export const getScanById = (state: IState, id: string) =>
  fromData.getScanById(state.data, id);
export const getScansCount = (state: IState) =>
  fromData.getScansCount(state.data);

export const getLoading = (state: IState) => state.loading;
export const getPatientsLoading = (state: IState) =>
  fromLoading.getPatientsLoading(state.loading);
export const getAppointmentsLoading = (state: IState) =>
  fromLoading.getAppointmentsLoading(state.loading);
export const getScansLoading = (state: IState) =>
  fromLoading.getScansLoading(state.loading);

export const getCurrent = (state: IState) => state.current;
export const getPatientsCurrent = (state: IState) =>
  fromCurrent.getPatientsCurrent(state.current);
export const getAppointmentsCurrent = (state: IState) =>
  fromCurrent.getAppointmentsCurrent(state.current);
export const getScansCurrent = (state: IState) =>
  fromCurrent.getScansCurrent(state.current);

export const getCurrentPatient = (state: IState) => {
  const id = getPatientsCurrent(state);
  if (id) {
    return getPatientById(state, id);
  }
  return undefined;
};
export const getCurrentAppointment = (state: IState) => {
  const id = getAppointmentsCurrent(state);
  if (id) {
    return getAppointmentById(state, id);
  }
  return undefined;
};
export const getCurrentScan = (state: IState) => {
  const id = getScansCurrent(state);
  if (id) {
    return getScanById(state, id);
  }
  return undefined;
};
