import { createAction } from 'typesafe-actions';
import { IScreen } from '../reducers/screen';
import { IModel } from '../reducers/data';

export const navigate = createAction('NAVIGATE', action => (screen: IScreen) => action(screen));
export const edit = createAction('EDIT', action => (model: IModel, id: string) => action({ model, id }));
export const details = createAction('DETAILS', action => (patientId: string, appointmentId?: string, scanId?: string) => action({ patientId, appointmentId, scanId }));

export * from './flash';
export * from './data';
export * from './setting';
export * from './scan-comparsion';
