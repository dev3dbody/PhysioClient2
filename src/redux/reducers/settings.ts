import { createReducer } from 'typesafe-actions';
import { IAction, changeSettingSuccess, loadSettingsSuccess } from '../actions';

export interface ISettings {
  allKeys: string[];
  byKey: { [index: string]: ISetting };
}

export interface ISetting {
  _id: string;
  _rev: string;
  value: string;
}

export const initSettings: ISettings = {
  byKey: {},
  allKeys: [],
};

const settingsReducer = createReducer<ISettings, IAction>(initSettings)
  .handleAction(loadSettingsSuccess, (state, { payload: { settings } }) => ({
    ...state,
    allKeys: settings.map(({ _id }) => _id),
    byKey: settings.reduce(
      (result, current) => ({ ...result, [current._id]: current }),
      {},
    ),
  }))
  .handleAction(changeSettingSuccess, (state, { payload: { setting } }) => ({
    ...state,
    byKey: {
      ...state.byKey,
      [setting._id]: setting,
    },
  }));

export default settingsReducer;

export const getSettings = (state: ISettings) =>
  state.allKeys.map(key => state.byKey[key]);
export const getSettingByKey = (state: ISettings) => (key: string) =>
  state.byKey[key] ? state.byKey[key].value : false;
