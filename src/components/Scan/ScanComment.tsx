import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { updateRequest } from "../../redux/actions";
import { INewScan, IResource } from "../../redux/reducers/data";

interface ScanCommentProps {
  scan: INewScan;
}

const PatientEdit: React.FunctionComponent<ScanCommentProps> = ({ scan }) => {
  const dispatch = useDispatch();
  type IFormState = {
    values: INewScan;
  };

  const [fields, setFields] = useState({
    values: scan
  });
  const [changed, setChanged] = useState(false);

  const handleChange = async (field: string, value: string) => {
    setFields((state: IFormState) => ({
      values: { ...state.values, [field]: value }
    }));
  };

  useEffect(() => {
    console.info({ Zf: fields.values.comment, c: scan.comment });
    if (fields.values.comment !== scan.comment) {
      setChanged(true);
    }
  }, [fields]);

  const handleSubmit = () => {
    dispatch(updateRequest("scans", fields.values as IResource));
    setChanged(false);
  };

  return (
    <Form>
      <Form.TextArea
        data-cy="comment"
        value={fields.values.comment}
        label=""
        placeholder="Zapisz notatkę do badania"
        onChange={(__, data) => handleChange("comment", data.value as string)}
      />
      {changed && (
        <Button.Group>
          <Button onClick={handleSubmit} positive>
            Zapisz
          </Button>
          <Button.Or text="lub" />
          <Button
            onClick={() => {
              setFields({
                values: { ...fields.values, comment: scan.comment }
              });
              setChanged(false);
            }}
          >
            Anuluj
          </Button>
        </Button.Group>
      )}
    </Form>
  );
};

export default PatientEdit;
