import { createAction } from 'typesafe-actions';
import { ISetting } from '../reducers/settings';

export const loadSettingsRequest = createAction('LOAD_SETTINGS_REQUEST');
export const changeSettingRequest = createAction(
  'CHANGE_SETTING_REQUEST',
  action => (key: string, value: string) => action({ key, value }),
);

export const loadSettingsSuccess = createAction(
  'LOAD_SETTINGS_SUCCESS',
  action => (settings: ISetting[]) => action({ settings }),
);
export const changeSettingSuccess = createAction(
  'CHANGE_SETTING_SUCCESS',
  action => (setting: ISetting) =>
    action(
      { setting },
      {
        flash: {
          duration: 3000,
          type: 'success',
          text: 'Ustawienia zostały zapisane',
        },
      },
    ),
);

export const loadSettingsFailure = createAction(
  'LOAD_SETTINGS_FAILURE',
  action => (err: object) => action({ err }),
);
export const changeSettingFailure = createAction(
  'CHANGE_SETTING_FAILURE',
  action => (err: object) => action({ err }),
);
