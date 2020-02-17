import { combineReducers } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import screen, { IScreen } from './screen';
// eslint-disable-next-line import/no-duplicates
import * as fromData from './data';
// eslint-disable-next-line import/no-duplicates
import data, { IData } from './data';
// eslint-disable-next-line import/no-duplicates
import * as fromLoading from './loading';
// eslint-disable-next-line import/no-duplicates
import loading, { ILoading } from './loading';
// eslint-disable-next-line import/no-duplicates
import * as fromCurrent from './current';
// eslint-disable-next-line import/no-duplicates
import * as fromSetting from './settings';
// eslint-disable-next-line import/no-duplicates
import settings, { ISettings } from './settings';
// eslint-disable-next-line import/no-duplicates
import current, { ICurrent } from './current';
import flash, { IFlash } from './flash';
import scanComparsion, { IScanComparsion } from './scan-comparsion';

export interface IState {
  screen: IScreen;
  data: IData;
  loading: ILoading;
  current: ICurrent;
  flash: [IFlash];
  settings: ISettings;
  scanComparsion: IScanComparsion;
}

const reducer = combineReducers({
  screen,
  data,
  loading,
  current,
  flash,
  settings,
  scanComparsion
});
export default reducer;

export const getScreen = (state: IState) => state.screen;

export const getData = (state: IState) => state.data;
export const getPatients = (state: IState) =>
  _.sortBy(fromData.getPatients(state.data), patient =>
    patient.surname.toLowerCase(),
  );
export const getPatientById = (state: IState, id: string) =>
  fromData.getPatientById(state.data, id);
export const getPatientsCount = (state: IState) =>
  fromData.getPatientsCount(state.data);
export const getAppointments = (state: IState) =>
  _.reverse(
    _.sortBy(fromData.getAppointments(state.data), appointment =>
      moment(appointment.visitDate).format('X'),
    ),
  );
export const getAppointmentById = (state: IState, id: string) =>
  fromData.getAppointmentById(state.data, id);
export const getAppointmentsCount = (state: IState) =>
  fromData.getAppointmentsCount(state.data);
export const getScans = (state: IState) => fromData.getScans(state.data);
export const getScanById = (state: IState, id: string) =>
  fromData.getScanById(state.data, id);
export const getScansCount = (state: IState) =>
  fromData.getScansCount(state.data);

export const getSettings = (state: IState) =>
  fromSetting.getSettings(state.settings);
export const getSettingByKey = (state: IState) =>
  fromSetting.getSettingByKey(state.settings);

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
export const getFlashes = (state: IState) => {
  return state.flash;
};

export const getAppointmentsWithPatients = (state: IState) => {
  const currentPatientId = getPatientsCurrent(state);

  return (currentPatientId
    ? getAppointments(state).filter(
      ({ patientId }) => patientId === currentPatientId,
    )
    : getAppointments(state)
  ).map(appointment => ({
    ...appointment,
    patient: getPatientById(state, appointment.patientId),
  }));
};

export const getScansWithPatients = (state: IState) => {
  const currentPatientId = getPatientsCurrent(state);
  const currentAppointmentId = getAppointmentsCurrent(state);

  return (currentPatientId && currentAppointmentId
    ? _.reverse(_.sortBy(getScans(state).filter(
      ({ appointmentId, patientId }) => {
        return patientId === currentPatientId && currentAppointmentId === appointmentId;
      }
    ), scan => scan.order)) : getScans(state)
  ).map(scan => ({
    ...scan,
    patient: getPatientById(state, scan.patientId),
  }));
};

export const getComparedScans = (state: IState) => {
  return state.scanComparsion.map(id => getScanById(state, id));
};

export const getComparedScansIds = (state: IState) => {
  return state.scanComparsion;
};

export const getComparedScansCount = (state: IState) => {
  return state.scanComparsion.length;
};

export const isScanCompared = (state: IState) => {
  const currentScanId = getScansCurrent(state);
  if (!currentScanId) {
    return false;
  }
  return !!state.scanComparsion.find(foundId => foundId === currentScanId);
};
