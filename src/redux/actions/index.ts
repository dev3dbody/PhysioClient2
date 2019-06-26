import { ActionType } from 'typesafe-actions';

export type IAction = ActionType<typeof import('./actions')>;

export * from './actions';
