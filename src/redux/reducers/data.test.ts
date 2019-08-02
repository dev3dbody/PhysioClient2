import data from './data';
import {
  listSuccess,
  createSuccess,
  updateSuccess,
  removeSuccess,
} from '../actions';

describe('data reducer', () => {
  const samplePatient1 = {
    _id: '1',
    _rev: '1',
    name: 'Jan',
    surname: 'Kowalski',
    birthDate: '1952-02-31',
    comment: 'Jakiśtam opis',
  };
  const samplePatient2 = {
    _id: '2',
    _rev: '2',
    name: 'Jerzy',
    surname: 'Nowak',
    birthDate: '1986-12-01',
    comment: 'Jakiśtam inny opis',
  };
  it('handles list action', () => {
    const state = {
      patients: { allIds: [], byId: {} },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    };
    const action = listSuccess('patients', [samplePatient1, samplePatient2]);
    const newState = data(state, action);
    expect(newState).toEqual({
      patients: {
        allIds: ['1', '2'],
        byId: { 1: samplePatient1, 2: samplePatient2 },
      },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    });
  });

  it('handles create action', () => {
    const state = {
      patients: { allIds: ['1'], byId: { 1: samplePatient1 } },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    };
    const action = createSuccess('patients', samplePatient2);
    const newState = data(state, action);
    expect(newState).toEqual({
      patients: {
        allIds: ['1', '2'],
        byId: { 1: samplePatient1, 2: samplePatient2 },
      },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    });
  });
  it('handles update action', () => {
    const state = {
      patients: { allIds: ['1'], byId: { 1: samplePatient1 } },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    };
    const action = updateSuccess('patients', { ...samplePatient2, _id: '1' });
    const newState = data(state, action);
    expect(newState).toEqual({
      patients: {
        allIds: ['1'],
        byId: { 1: { ...samplePatient2, _id: '1' } },
      },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    });
  });
  it('handles remove action', () => {
    const state = {
      patients: {
        allIds: ['1', '2'],
        byId: { 1: samplePatient1, 2: samplePatient2 },
      },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    };
    const action = removeSuccess('patients', '1');
    const newState = data(state, action);
    expect(newState).toEqual({
      patients: {
        allIds: ['2'],
        byId: { 2: samplePatient2 },
      },
      appointments: { allIds: [], byId: {} },
      scans: { allIds: [], byId: {} },
    });
  });
});
