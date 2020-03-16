import { createAction } from 'typesafe-actions';
import { IScreen } from '../reducers/screen';
import { IModel } from '../reducers/data';

export const navigate = createAction('NAVIGATE')<IScreen>();
export const edit = createAction('EDIT', (model: IModel, id: string) => ({ model, id }))();
export const details = createAction('DETAILS',(patientId: string, appointmentId?: string, scanId?: string) => ({ patientId, appointmentId, scanId }))();

export * from './flash';
export * from './data';
export * from './setting';
export * from './scan-comparsion';
