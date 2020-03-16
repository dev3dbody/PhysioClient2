import { createAction } from 'typesafe-actions';
import { ISetting } from '../reducers/settings';

export const loadSettingsRequest = createAction('LOAD_SETTINGS_REQUEST');
export const changeSettingRequest =createAction(
  'CHANGE_SETTING_REQUEST',
  (key: string, value: string) => ({ key, value }),
);

export const loadSettingsSuccess = createAction(
  'LOAD_SETTINGS_SUCCESS',
  (settings: ISetting[]) => ({ settings }),
);
export const changeSettingSuccess = createAction(
  'CHANGE_SETTING_SUCCESS',
  (setting: ISetting) => ({ setting }), () => ({
    flash: {
      duration: 3000,
      type: 'success',
      text: 'Ustawienia zostały zapisane',
    }
  }));

export const loadSettingsFailure = createAction(
  'LOAD_SETTINGS_FAILURE',
  (err: object) => ({ err }),
);
export const changeSettingFailure = createAction(
  'CHANGE_SETTING_FAILURE',
  (err: object) => ({ err }),
);
