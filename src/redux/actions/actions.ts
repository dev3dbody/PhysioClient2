import { createAction } from 'typesafe-actions';
import { IScreen } from '../reducers/screen';
import { IModel, IResource, INewResource } from '../reducers/data';

export const navigate = createAction('NAVIGATE', action => (screen: IScreen) => action(screen));

export const listRequest = createAction('LIST_REQUEST', action => (model: IModel) => action({ model }));
export const createRequest = createAction('CREATE_REQUEST', action => (model: IModel, resource: INewResource) => action({ model, resource }));
export const updateRequest = createAction('UPDATE_REQUEST', action => (model: IModel, resource: IResource) => action({ model, resource }));
export const removeRequest = createAction('REMOVE_REQUEST', action => (model: IModel, resource: IResource) => action({ model, resource }));

export const listSuccess = createAction('LIST_SUCCESS', action => (model: IModel, data: IResource[]) => action({ model, data }));
export const createSuccess = createAction('CREATE_SUCCESS', action => (model: IModel, resource: IResource) => action(
  { model, resource },
  {
    flash: {
      duration: 3000,
      type: 'success',
      text: 'Obiekt został zapisany',
    },
  }
));
export const updateSuccess = createAction('UPDATE_SUCCESS', action => (model: IModel, resource: IResource) => action(
  { model, resource },
  {
    flash: {
      duration: 3000,
      type: 'success',
      text: 'Zmiany zostały zapisane',
    },
  }
));
export const removeSuccess = createAction('REMOVE_SUCCESS', action => {
  return (model: IModel, id: string) => action({ model, id }, {
    flash: {
      duration: 3000,
      type: 'success',
      text: 'Obiekt został usunięty',
    },
  });
});

export const listFailure = createAction('LIST_FAILURE', action => (model: IModel, err: object) => action({ model, err }));
export const createFailure = createAction('CREATE_FAILURE', action => (model: IModel, err: object) => action({ model, err }));
export const updateFailure = createAction('UPDATE_FAILURE', action => (model: IModel, err: object) => action({ model, err }));
export const removeFailure = createAction('REMOVE_FAILURE', action => (model: IModel, err: object) => action({ model, err }));
export const edit = createAction('EDIT', action => (model: IModel, id: string) => action({ model, id }));
export const details = createAction('DETAILS', action => (patientId: string, appointmentId?: string, scanId?: string) => action({ patientId, appointmentId, scanId }));

export * from './flash';
