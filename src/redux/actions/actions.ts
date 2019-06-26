import { createAction } from 'typesafe-actions';
import { IScreen } from '../reducers/screen';
import { IModel, IResource, INewResource } from '../reducers/data';

export const navigate = createAction('NAVIGATE', action => {
  return (screen: IScreen) => action(screen);
});

interface IListOptions {
  sortBy?: string
}

export const listRequest = createAction('LIST_REQUEST', action => {
  return (model: IModel, options?: IListOptions ) => action({ model, options });
});
export const createRequest = createAction('CREATE_REQUEST', action => {
  return (model: IModel, resource: INewResource) => action({ model, resource });
});
export const updateRequest = createAction('UPDATE_REQUEST', action => {
  return (model: IModel, resource: IResource) => action({ model, resource });
});
export const removeRequest = createAction('REMOVE_REQUEST', action => {
  return (model: IModel, resource: IResource) => action({ model, resource });
});

export const listSuccess = createAction('LIST_SUCCESS', action => {
  return (model: IModel, data: IResource[]) => action({ model, data });
});
export const createSuccess = createAction('CREATE_SUCCESS', action => {
  return (model: IModel, resource: IResource) => action({ model, resource });
});
export const updateSuccess = createAction('UPDATE_SUCCESS', action => {
  return (model: IModel, resource: IResource) => action({ model, resource });
});
export const removeSuccess = createAction('REMOVE_SUCCESS', action => {
  return (model: IModel, id: string) => action({ model, id });
});
export const listFailure = createAction('LIST_FAILURE', action => {
  return (model: IModel, err: object) => action({ model, err });
});
export const createFailure = createAction('CREATE_FAILURE', action => {
  return (model: IModel, err: object) => action({ model, err });
});
export const updateFailure = createAction('UPDATE_FAILURE', action => {
  return (model: IModel, err: object) => action({ model, err });
});
export const removeFailure = createAction('REMOVE_FAILURE', action => {
  return (model: IModel, err: object) => action({ model, err });
});
export const edit = createAction('EDIT', action => {
  return (model: IModel, id: string) => action({ model, id });
});
export const details = createAction('DETAILS', action => {
  return (model: IModel, id: string) => action({ model, id });
});
