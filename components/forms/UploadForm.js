import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../providers/Auth";
import { upload } from "../../services/community";
import Button from "../Button";
import ErrorMessage from "./ErrorMessage";
import FileInput from "./FileInput";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify};
`;

const ThumbnailHolder = styled.div`
  height: 160px;
  max-width: 192px;

  padding: 0.5rem;
  margin: 1rem;

  border-radius: 8px;
  background-color: ${(props) => props.theme.dark};
`;

const FilePreview = styled.img`
  && {
    object-fit: contain;
  }
`;

export default function UploadForm(props) {
  const { user } = useAuth();

  const [previews, setPreviews] = useState([]);
  const [fileList, setFileList] = useState({});
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);

  function handleChange(event) {
    const list = event.target.files;

    props.validationSchema
      .validate({ files: list })
      .then(async () => {
        let temp = [];
        for (let i = 0; i < list.length; i++) {
          temp.push(URL.createObjectURL(list[i]));
        }

        setFileList(list);
        setPreviews(temp);
        setValid(true);
      })
      .catch((err) => {
        setValid(false);
        setError(err.errors[0]);
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await upload(fileList, {
      refId: user.id,
      ref: "user",
      source: "users-permissions",
      field: "picture",
    });

    if (res.status === 200) {
      reset();
    } else {
    }
  }

  function reset() {
    setFileList({});
    setPreviews([]);
    props.closeForm();
  }

  return (
    <>
      <CustomForm onSubmit={handleSubmit}>
        {previews && (
          <>
            <Row justify={"center"}>
              <b>Previews</b>
            </Row>
            <Row justify={"space-evenly"}>
              {previews &&
                previews.map((preview) => (
                  <ThumbnailHolder key={preview}>
                    <FilePreview src={preview} />
                  </ThumbnailHolder>
                ))}
            </Row>
          </>
        )}

        <FileInput
          name={"files"}
          accept="image/*"
          multiple={props.multiple}
          onChange={handleChange}
        />
        <ErrorMessage errorMessage={error} />
        <Row justify={"flex-end"}>
          <Button
            inverted
            label={"Cancel"}
            color={"error"}
            onClick={() => props.closeForm()}
            type="reset"
          />
          <Button
            label={"Upload"}
            color={"primary"}
            disabled={!valid}
            type="submit"
          />
        </Row>
      </CustomForm>
    </>
  );
}

UploadForm.propTypes = {
  /* Function use to hide the form if used on an overlay */
  closeForm: PropTypes.func,
  /* Yup schema to validate the inputs */
  validationSchema: PropTypes.object.isRequired,
  /* Actions to take on form submit */
  handleSubmit: PropTypes.func.isRequired,
  /* Whether or not the form should accept multiple file input */
  multiple: PropTypes.bool,
};

UploadForm.defaultProps = {
  closeForm: null,
  multiple: false,
};
