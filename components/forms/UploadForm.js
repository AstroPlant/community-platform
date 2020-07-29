import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { upload } from "../../services/community";
import Button from "../Button";
import ErrorMessage from "../inputs/ErrorMessage";
import FileInput from "../inputs/FileInput";
import LoadingAnimation from "../LoadingAnimation";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h3`
  margin-bottom: 1.5rem;
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
  const [previews, setPreviews] = useState([]);
  const [fileList, setFileList] = useState({});
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setError("");
      })
      .catch((err) => {
        setValid(false);
        setError(err.errors[0]);
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const res = await upload(fileList, props.uploadParameters);

    if (res.status === 200) {
      setLoading(false);
      props.callback();
      reset();
    } else {
      setLoading(false);
    }
  }

  function reset() {
    setFileList({});
    setPreviews([]);
    setValid(false);
    setLoading(false);
    setError("");
    props.closeForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>{props.title}</FormTitle>
      {previews.length != 0 && (
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
      <ErrorMessage message={error} />
      <Row justify={"flex-end"}>
        <Button
          inverted
          label={"Cancel"}
          color={"error"}
          onClick={() => props.closeForm()}
          type="reset"
        />

        {loading ? (
          <LoadingAnimation />
        ) : (
          <Button
            label={"Upload"}
            color={"primary"}
            disabled={!valid}
            type="submit"
          />
        )}
      </Row>
    </form>
  );
}

UploadForm.propTypes = {
  /* Function use to hide the form if used on an overlay */
  closeForm: PropTypes.func,
  /* Yup schema to validate the inputs */
  validationSchema: PropTypes.object.isRequired,
  /* Additional & optional upload parameters */
  uploadParameters: PropTypes.object,
  /* Function called on submit success */
  callback: PropTypes.func,
  /* Whether or not the form should accept multiple file input */
  multiple: PropTypes.bool,
  /* The title of the form */
  title: PropTypes.string.isRequired,
};

UploadForm.defaultProps = {
  closeForm: null,
  multiple: false,
  uploadParameters: {},
};
