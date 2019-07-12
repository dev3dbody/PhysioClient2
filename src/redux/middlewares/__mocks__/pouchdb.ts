export const samplePatients = [
  {
    _id: "1",
    _rev: "1",
    name: "First",
    surname: "Patient",
    birthDate: "1988-12-01",
    comment: "No comment for now"
  },
  {
    _id: "2",
    _rev: "2",
    name: "Second",
    surname: "Patient",
    birthDate: "1970-01-27",
    comment: "No comment either"
  }
];
const pouchResponse = {
  rows: samplePatients.map(doc => ({
    doc
  }))
};
export const newPatient = {
  id: "3",
  rev: "3",
  name: "Third",
  surname: "Patient",
  birthDate: "1999-03-30",
  comment: "Still no comment"
};
export const updatePatient = {
  _id: "2",
  _rev: "2",
  name: "Updated",
  surname: "Patient",
  birthDate: "1970-01-27",
  comment: "Some comment, perhaps."
};

export const mockAllDocs = jest.fn().mockResolvedValue(pouchResponse);
export const mockPost = jest.fn().mockResolvedValue(newPatient);
export const mockPut = jest.fn().mockResolvedValue({ rev: 7777 });
export const mockRemove = jest
  .fn()
  .mockResolvedValue({ id: updatePatient._id });
const mockModel = {
  allDocs: mockAllDocs,
  post: mockPost,
  put: mockPut,
  remove: mockRemove
};

const fakePouch = jest.fn();
fakePouch.mockImplementation(() => {
  return mockModel;
});

export default fakePouch;
