import { createAction } from 'typesafe-actions';

export type IFlashType = 'info' | 'warning' | 'error' | 'success';

export const addFlashMessage = createAction('ADD_FLASH', action => {
  return (id: string, type: IFlashType, text: string, duration?: number) =>
    action({ id, type, text, duration });
});

export const removeFlashMessage = createAction('REMOVE_FLASH', action => {
  return (id: string) => action({ id });
});
