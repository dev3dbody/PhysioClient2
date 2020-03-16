import { createAction } from 'typesafe-actions';

export const compareAdd = createAction('COMPARE_ADD', (id: string) => ({ id }), () => ({
  flash: {
    duration: 3000,
    type: 'success',
    text: 'Badanie zostało dodane do porównania',
  },
}));

export const compareRemove = createAction('COMPARE_REMOVE', (id: string) => ({ id }), () => ({
      flash: {
        duration: 3000,
        type: 'info',
        text: 'Badanie zostało usunięte z porównania',
      },
}));

export const compareClear = createAction('COMPARE_CLEAR', undefined, () => ({
  flash: {
    duration: 3000,
    type: 'info',
    text: 'Lista badań do porównania została wyczyszczona',
  },
}));
