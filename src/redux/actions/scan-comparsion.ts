import { createAction } from 'typesafe-actions';

export const compareAdd = createAction('COMPARE_ADD', action => {
  return (id: string) =>
    action({ id }, {
      flash: {
        duration: 3000,
        type: 'success',
        text: 'Badanie zostało dodane do porównania',
      },
    });
});

export const compareRemove = createAction('COMPARE_REMOVE', action => {
  return (id: string) =>
    action({ id }, {
      flash: {
        duration: 3000,
        type: 'info',
        text: 'Badanie zostało usunięte z porównania',
      },
    });
});

export const compareClear = createAction('COMPARE_CLEAR', action => {
  return () => action(null, {
    flash: {
      duration: 3000,
      type: 'info',
      text: 'Lista badań do porównania została wyczyszczona',
    },
  });
});
