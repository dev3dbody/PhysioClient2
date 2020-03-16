import { createAction } from 'typesafe-actions';

export type IFlashType = 'info' | 'warning' | 'error' | 'success';

export const addFlashMessage = createAction(
  'ADD_FLASH',
  (id: string, type: IFlashType, text: string, duration?: number) => ({ id, type, text, duration })
);
export const removeFlashMessage = createAction('REMOVE_FLASH', (id: string) => ({ id }));
