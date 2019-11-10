import { Middleware } from 'redux';
import PouchDb from 'pouchdb';
import { getType } from 'typesafe-actions';
import {
  IAction,
  loadSettingsRequest,
  loadSettingsSuccess,
  loadSettingsFailure,
  changeSettingRequest,
  changeSettingSuccess,
  changeSettingFailure,
} from '../actions';
import { ISetting } from '../reducers/settings';

const db = new PouchDb('settings');

const initSettings = {
  serverHost: 'localhost:50051',
  pathToScans: 'C:/Skany/'
};

(async () => {
  try {
    const docs = await db.allDocs();
    const existingIds = (docs.rows as any).map(({ id }: { id: string }) => id);
    if (!Object.keys(initSettings).every(id => existingIds.includes(id))) {
      const newDocs = Object.entries(initSettings)
        .filter(([key, value]) => !existingIds.includes(key))
        .map(([key, value]) => ({ _id: key, value }));
      await db.bulkDocs(newDocs);
    }
  } catch (err) {
    throw new Error(
      `Cannot initialize settings collection in PouchDb; cause: ${err}`,
    );
  }
})();

const settings: Middleware = ({ dispatch }) => next => async (
  action: IAction,
) => {
  next(action);

  if (action.type === getType(loadSettingsRequest)) {
    try {
      const docs = await db.allDocs({
        // eslint-disable-next-line @typescript-eslint/camelcase
        include_docs: true,
      });

      const rows: ISetting[] = (docs.rows as any).map(
        ({ doc }: { doc: ISetting }) => doc,
      );

      dispatch(loadSettingsSuccess(rows));
    } catch (err) {
      dispatch(loadSettingsFailure(err));
    }
  }

  if (action.type === getType(changeSettingRequest)) {
    const { key, value }: { key: string; value: string } = action.payload;

    try {
      const { _rev } = await db.get(key);
      const setting = await db.put({
        _id: key,
        _rev,
        value,
      });
      dispatch(changeSettingSuccess({ _id: key, _rev: setting.rev, value }));
    } catch (err) {
      dispatch(changeSettingFailure(err));
    }
  }
};
export default settings;
