import { Middleware } from 'redux';
import PouchDb from 'pouchdb';

import {
  listRequest,
  createRequest,
  updateRequest,
  removeRequest,
  listSuccess,
  createSuccess,
  updateSuccess,
  removeSuccess,
  IAction,
  listFailure,
  createFailure,
  updateFailure,
  removeFailure,
} from '../actions';

import { IResource, IModel, INewResource } from '../reducers/data';
import { getType } from 'typesafe-actions';

const db = {
  patients: new PouchDb('patients'),
  appointments: new PouchDb('appointments'),
  scans: new PouchDb('scans'),
};

const database: Middleware = ({ dispatch }) => next => async (
  action: IAction,
) => {
  next(action);

  if (action.type === getType(listRequest)) {
    const { model }: { model: IModel } = action.payload;
    try {
      let docs = await db[model].allDocs({
        include_docs: true,
      });

      let rows = (docs.rows as any).map(({ doc }: { doc: any }) => doc);

      dispatch(listSuccess(model, rows));
    } catch (err) {
      dispatch(listFailure(model, err));
    }
  }

  if (action.type === getType(createRequest)) {
    const {
      model,
      resource,
    }: { model: IModel; resource: INewResource } = action.payload;

    const { mesh, ...resourceWithoutBlobs } = resource as any;

    let { id, rev } = await db[model].post(resourceWithoutBlobs);
    try {
      console.log({done: true, id, rev});
      if (mesh) {
        const result = await db.scans.putAttachment(
          id,
          'scan.ply',
          rev,
          new Blob([mesh], { type: 'application/octet-stream' }),
          'application/octet-stream', // or 'text/plain'?
        );
        rev = result.rev;
      }
      dispatch(
        createSuccess(model, { ...resourceWithoutBlobs, _id: id, _rev: rev }),
      );
    } catch (err) {
      dispatch(createFailure(model, err));
    }
  }

  if (action.type === getType(updateRequest)) {
    const {
      model,
      resource,
    }: { model: IModel; resource: IResource } = action.payload;

    const { mesh, ...resourceWithoutBlobs } = resource as any;

    try {
      const { id, rev } = await db[model].put(resource);
      if (mesh) {
        await db.scans.putAttachment(
          id,
          rev,
          'scan.ply',
          new Blob([mesh], { type: 'application/octet-stream' }),
          'application/octet-stream', // or 'text/plain'?
        );
      }
      dispatch(updateSuccess(model, { ...resourceWithoutBlobs, _rev: rev }));
    } catch (err) {
      dispatch(updateFailure(model, err));
    }
  }
  if (action.type === getType(removeRequest)) {
    const {
      model,
      resource,
    }: { model: IModel; resource: IResource } = action.payload;
    try {
      const { id: removedId } = await db[model].remove(resource);
      // db.scans.removeAttachment() ?
      dispatch(removeSuccess(model, removedId));
    } catch (err) {
      dispatch(removeFailure(model, err));
    }
  }
};
export default database;
