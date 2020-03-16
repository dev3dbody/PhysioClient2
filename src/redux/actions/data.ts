import { createAction } from 'typesafe-actions';
import { IModel, IResource, INewResource } from '../reducers/data';

export const listRequest = createAction('LIST_REQUEST', (model: IModel) => ({ model }))();

interface ICreateRequest {
  model: IModel;
  resource: INewResource;
}

export const createRequest = createAction(
  'CREATE_REQUEST',
  (model: IModel, resource: INewResource) => ({ model, resource })
)();
export const updateRequest = createAction(
  'UPDATE_REQUEST',
  (model: IModel, resource: IResource) => ({ model, resource })
);
export const removeRequest = createAction(
  'REMOVE_REQUEST',
  (model: IModel, resource: IResource) => ({ model, resource })
);
export const listSuccess = createAction(
  'LIST_SUCCESS',
  (model: IModel, data: IResource[]) => ({ model, data })
);
export const createSuccess = createAction('CREATE_SUCCESS',
  (model: IModel, resource: IResource)  => ({ model, resource }),
  () => ({
    flash: {
      duration: 3000,
      type: 'success',
      text: 'Obiekt został zapisany',
    },
  })
);
export const updateSuccess = createAction('UPDATE_SUCCESS',
  (model: IModel, resource: IResource) => ({ model, resource }),
  () => ({
    flash: {
      duration: 3000,
      type: 'success',
      text: 'Zmiany zostały zapisane',
    },
  })
);
export const removeSuccess = createAction('REMOVE_SUCCESS',
  (model: IModel, id: string) => ({ model, id }),
  () => ({
    flash: {
      duration: 3000,
      type: 'success',
      text: 'Obiekt został usunięty',
    },
  })
);

export const listFailure = createAction('LIST_FAILURE', (model: IModel, err: object) => ({ model, err }));
export const createFailure = createAction('CREATE_FAILURE', (model: IModel, err: object) => ({ model, err }));
export const updateFailure = createAction('UPDATE_FAILURE', (model: IModel, err: object) => ({ model, err }));
export const removeFailure = createAction('REMOVE_FAILURE', (model: IModel, err: object) => ({ model, err }));
