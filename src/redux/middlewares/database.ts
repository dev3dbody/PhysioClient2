import { Middleware } from 'redux';
import PouchDb from 'pouchdb';
import { getType } from 'typesafe-actions';

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

/*
const sampleData = {
  patients: [
    {
      id: 'patient-000001',
      name: 'First',
      surname: 'Patient',
      birthDate: '1988-12-12',
      comment: 'No comment for now',
    },
  ],
  appointments: [
    {
      id: 'appointment-000001',
      visitDate: '2019-06-15',
      interview: 'Some interview data',
      patientId: 'patient-000001',
    },
  ],
  scans: [
    {
      id: 'scan-000001',
      order: 1,
      mesh: 'lotsadata',
      appointmentId: 'appointment-000001',
    },
  ],
};
*/
const db = {
  patients: new PouchDb('patients'),
  appointments: new PouchDb('appointments'),
  scans: new PouchDb('scans'),
};

// eslint-disable-next-line no-undef
(window as any).db = db;

const database: Middleware = ({ dispatch }) => next => async (
  action: IAction,
) => {
  next(action);
  if (action.type === getType(listRequest)) {
    const { model }: { model: IModel } = action.payload;
    try {
      const docs = await db[model].allDocs({
        // eslint-disable-next-line @typescript-eslint/camelcase
        include_docs: true,
        attachments: false
      });

      const rows = (docs.rows as any).map(({ doc }: { doc: any }) => doc);

      dispatch(
        listSuccess(
          model,
          rows,
        ),
      );
    } catch (err) {
      dispatch(listFailure(model, err));
    }
  }

  if (action.type === getType(createRequest)) {
    const {
      model,
      resource,
    }: { model: IModel; resource: INewResource } = action.payload;

    try {
      const { mesh, ...resourceWithoutBlobs } = resource as any;
      // tslint:disable-next-line:prefer-const
      let { id, rev } = await db[model].post(resourceWithoutBlobs);
      if (mesh) {
        const result = await db[model].putAttachment(
          id,
          'scan.ply',
          rev,
          // eslint-disable-next-line no-undef
          new Blob([mesh], { type: 'application/octet-stream' }),
          'application/octet-stream', // or 'text/plain'?
        );
        rev = result.rev;
      }
      dispatch(createSuccess(model, { ...resourceWithoutBlobs, _id: id, _rev: rev }));
    } catch (err) {
      dispatch(createFailure(model, err));
    }
  }

  if (action.type === getType(updateRequest)) {
    const {
      model,
      resource,
    }: { model: IModel; resource: IResource } = action.payload;

    try {
      const { rev } = await db[model].put(resource);
      dispatch(updateSuccess(model, { ...resource, _rev: rev }));
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
      dispatch(removeSuccess(model, removedId));
    } catch (err) {
      dispatch(removeFailure(model, err));
    }
  }
};
export default database;
